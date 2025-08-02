import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  MessageFlags,
  DiscordjsError,
  DiscordjsErrorCodes,
} from 'discord.js';
import { buildCabinetModal, buildCustomId } from '@/components/modals/cabinet-modal/builders';
import { TIMEOUT } from '@/components/modals/cabinet-modal';
import { embeds } from '@/constants';

export default {
  id: 'createCabinet',
  data: new ButtonBuilder()
    .setCustomId('createCabinet')
    .setLabel('Створити кабінет')
    .setEmoji('👤')
    .setStyle(ButtonStyle.Primary),

  async run(i: ButtonInteraction) {
    const customId = buildCustomId('create', i.user.id);

    const modal = buildCabinetModal('create', customId);
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
