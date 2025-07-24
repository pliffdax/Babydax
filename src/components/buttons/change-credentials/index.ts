import { TIMEOUT } from '@/components/modals/cabinet-modal';
import { buildCustomId, buildCabinetModal } from '@/components/modals/cabinet-modal/builders';
import { embeds } from '@/constants';
import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  DiscordjsError,
  DiscordjsErrorCodes,
  MessageFlags,
} from 'discord.js';

export default {
  id: 'changeCredentials',
  data: new ButtonBuilder()
    .setCustomId('changeCredentials')
    .setLabel('Редагувати дані')
    .setEmoji('✏️')
    .setStyle(ButtonStyle.Secondary),

  async run(i: ButtonInteraction) {
    const customId = buildCustomId('edit', i.user.id);

    // TODO: 
    // Fetch defaults from DB and parse them into the function
    const modal = buildCabinetModal('edit', customId, {}); // inside {}
    await i.showModal(modal);

    try {
      await i.awaitModalSubmit({
        filter: m => m.customId === customId && m.user.id === i.user.id,
        time: TIMEOUT,
      });
    } catch (err) {
      if (
        err instanceof DiscordjsError &&
        err.code === DiscordjsErrorCodes.InteractionCollectorError
      ) {
        // TODO:
        // Handle the case when the modal was not submitted in time with error embed and a message in it

        return await i.followUp({
          embeds: [
            embeds.warning(
              i.user,
              '⌛️ На заповнення форми було дано 1 хвилину. Будь ласка, спробуйте ще раз.',
            ),
          ],
          flags: MessageFlags.Ephemeral,
        });
      }

      throw err;
    }
  },
};
