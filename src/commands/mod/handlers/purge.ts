import {
  ChatInputCommandInteraction,
  GuildTextBasedChannel,
  Collection,
  Message,
  MessageFlags,
} from 'discord.js';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal, embeds } from '@/constants';

const BULK_MAX = 100;
const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

export async function purgeHandler(i: ChatInputCommandInteraction) {
  await i.deferReply({ flags: MessageFlags.Ephemeral });

  const amountReq = i.options.getNumber('n', true);
  const channel = (i.options.getChannel('channel', false) ?? i.channel) as GuildTextBasedChannel;
  const user = i.options.getUser('user', false);

  if (!channel?.isTextBased()) throw new Error('Selected channel is not text based');

  let collected: Message[] = [];
  let beforeId: string | undefined;

  while (collected.length < amountReq) {
    const batch: Collection<string, Message> = await channel.messages.fetch({
      limit: BULK_MAX,
      ...(beforeId && { before: beforeId }),
    });

    if (batch.size === 0) break;

    const filtered = user ? batch.filter(m => m.author.id === user.id) : batch;
    collected.push(...filtered.values());

    beforeId = batch.last()!.id;
    if (batch.size < BULK_MAX) break;
  }

  collected = collected.slice(0, amountReq);
  if (!collected.length) {
    await i.editReply({
      embeds: [embeds.error(i.user, '🚫 Не знайшов жодного повідомлення, яке відповідає умовам.')],
    });
    return;
  }

  const now = Date.now();
  let deleted = 0;

  for (let idx = 0; idx < collected.length; idx += BULK_MAX) {
    const chunk = collected.slice(idx, idx + BULK_MAX);

    const [bulkable, old] = chunk.reduce<[Message[], Message[]]>(
      (acc, m) => {
        (now - m.createdTimestamp > TWO_WEEKS ? acc[1] : acc[0]).push(m);
        return acc;
      },
      [[], []],
    );

    if (bulkable.length) {
      await channel.bulkDelete(bulkable, true);
      deleted += bulkable.length;
    }

    for (const m of old) {
      await m.delete().catch(() => null);
      deleted++;
    }
  }

  const embed = makeDefaultEmbed(colorsDecimal.Info, {
    title: 'Очищення каналу',
    description:
      `🗑️ Видалено **${deleted}** повідомлень` + (user ? ` користувача ${user}.` : '.'),
  });

  await channel.send({ embeds: [embed] });

  await i.deleteReply().catch(() => null);
}
