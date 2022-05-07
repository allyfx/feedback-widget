import { prisma } from "../../prisma";

import { FeedbackCreateData, FeedbackUpdateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
  async create({ type, comment, screenshot, userEmail }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
        userEmail,
      },
    });
  };

  async update({ id, feedback }: FeedbackUpdateData) {
    await prisma.feedback.update({
      where: {
        id,
      },
      data: feedback,
    })
  };

  async find(id: string) {
    return await prisma.feedback.findFirst({
      where: {
        id,
      }
    })
  }

  async list() {
    return await prisma.feedback.findMany();
  }
}