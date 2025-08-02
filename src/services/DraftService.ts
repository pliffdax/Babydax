import { Message } from 'discord.js';
import { OrderDraft, DraftStage } from '@/types';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal } from '@/constants';

const TTL = 60_000;
const STAGE_TTL: Record<DraftStage, number> = {
  [DraftStage.Semester]: TTL,
  [DraftStage.Subject]: TTL,
  [DraftStage.Tasks]: TTL,
  [DraftStage.Description]: TTL * 15,
  [DraftStage.Confirm]: TTL,
};

export class DraftService {
  private drafts = new Map<string, OrderDraft>();
  private indexByUser = new Map<string, string>();

  private getTtl(draft: OrderDraft) {
    return STAGE_TTL[draft.stage] ?? 60_000;
  }
  private mkTimeout(id: string, ttl: number) {
    return setTimeout(() => this.expire(id), ttl);
  }

  create(userId: string, message?: Message): OrderDraft {
    const oldId = this.indexByUser.get(userId);
    if (oldId) this.expire(oldId);

    const id = crypto.randomUUID();
    const draft: OrderDraft = {
      id,
      userId,
      message,
      stage: DraftStage.Semester,
      timeout: this.mkTimeout(id, STAGE_TTL[DraftStage.Semester]),
    };
    this.drafts.set(id, draft);
    this.indexByUser.set(userId, id);
    return draft;
  }

  attachMessage(id: string, message: Message) {
    const draft = this.drafts.get(id);
    if (draft) draft.message = message;
  }

  getByUser(userId: string) {
    const id = this.indexByUser.get(userId);
    return id ? this.drafts.get(id) : undefined;
  }

  update(id: string, mutator: (d: OrderDraft) => void): OrderDraft {
    const draft = this.drafts.get(id);
    if (!draft) throw new Error('Draft not found');
    mutator(draft);
    this.bump(draft.id);
    return draft;
  }

  private bump(id: string) {
    const draft = this.drafts.get(id);
    if (!draft) return;
    clearTimeout(draft.timeout);
    draft.timeout = this.mkTimeout(id, this.getTtl(draft));
  }

  expire(id: string, cancel = false) {
    const draft = this.drafts.get(id);
    if (!draft) return;
    const embed = makeDefaultEmbed(cancel ? colorsDecimal.Error : colorsDecimal.Warning, {
      title: cancel ? '🚫 Замовлення скасовано' : '⌛ Час вичерпано. Почніть замовлення спочатку.',
    });
    draft.message
      ?.edit({
        embeds: [embed],
        components: [],
      })
      .catch(() => {});
    clearTimeout(draft.timeout);
    this.drafts.delete(id);
    this.indexByUser.delete(draft.userId);
  }
}

export const draftService = new DraftService();
