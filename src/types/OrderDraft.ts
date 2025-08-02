import { Message } from "discord.js";

export enum DraftStage { Semester, Subject, Tasks, Description, Confirm }

export interface OrderDraft {
  id: string;
  userId: string;
  stage: DraftStage;
  semesterId?: number;
  subjectId?: string;
  taskIds?: string[];
  description?: string;
  message?: Message;
  timeout: NodeJS.Timeout;
}