import { componentsPromise } from '@/components';
import { embeds, colorsDecimal } from '@/constants';
import { Nullable } from '@/types';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import {
  ChatInputCommandInteraction,
  CategoryChannel,
  TextChannel,
  ActionRowBuilder,
  ButtonBuilder,
} from 'discord.js';

export const orderMainSetHandler = async (
  i: ChatInputCommandInteraction,
  category: Nullable<CategoryChannel>,
  channel: Nullable<TextChannel>,
  message: Nullable<boolean>,
) => {
  const { user } = i;

  if ([category, channel, message].every(v => v === null)) {
    return i.editReply({
      embeds: [embeds.error(user, '🚫 Не вказано жодного параметра для налаштування!')],
    });
  }

  if (message) {
    // TODO:
    // Create a message embed for the order channel
    // This should include instructions on how to use the order system
    const embed = makeDefaultEmbed(colorsDecimal.Info, {
      title: '📦 Система замовлень',
      description:
        'Вітаємо у системі замовлень! Будь ласка, заповніть форму нижче, щоб створити свій кабінет.',
      fields: [
        {
          name: 'Інструкції',
          value:
            '1. Натисніть кнопку "Створити кабінет".\n2. Заповніть форму з вашими даними.\n3. Після успішного створення кабінету, ви отримаєте підтвердження.',
          inline: false,
        },
        {
          name: 'Підтримка',
          value:
            'Якщо у вас виникли питання або проблеми, будь ласка, зверніться до адміністрації сервера.',
          inline: false,
        },
      ],
    });

    const { exactMap } = await componentsPromise;

    await (i.channel as TextChannel)!.send({
      embeds: [embed],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          exactMap.get('createOrderChannel')!.data as ButtonBuilder,
          exactMap.get('infoOrder')!.data as ButtonBuilder,
          exactMap.get('infoPrice')!.data as ButtonBuilder,
        ),
      ],
    });
  }

  const finalMessage = `Категорія замовлень: ${category ? category.name : 'Не вказано'}
  Канал замовлень: ${channel ? channel.name : 'Не вказано'}
  Повідомлення: ${message ? 'Так' : 'Ні'}`;

  await i.editReply({
    embeds: [embeds.success(user, `⚙️ Налаштування системи замовлень оновлено:\n${finalMessage}`)],
  });

  // TODO:
  // GuildID database check initialization
  // If guildId exists, update the settings
  // If not, create a new entry with the provided settings

  // TODO:
  // CategoryId and ChannelId database check initialization
  // If category and channel are provided, update the settings
  // If not, write the initialization into DB
};
