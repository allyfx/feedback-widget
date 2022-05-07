import { Feedback } from "@prisma/client";

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
  userEmail?: string;
}

export interface FeedbackUpdateData {
  id: string;
  feedback: Feedback;
}

export interface FeedbackRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  find: (id: string) => Promise<Feedback | null>;
  list: () => Promise<Feedback[]>;
  update: (data: FeedbackUpdateData) => Promise<void>;
}
