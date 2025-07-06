import type {
  ApplicationCommandDataResolvable,
  Interaction,
} from 'discord.js';

export interface Command<I extends Interaction = Interaction> {
  data: ApplicationCommandDataResolvable;
  run?: (interaction: I) => Promise<unknown>;
  test?: boolean;
  devOnly?: boolean;
}
