import { prisma } from "../../prisma";
import { CreateFeedbackParams, FeedbackRepository } from "../feedbacksRepo";

export class PrismaFeedbackRepository implements FeedbackRepository {
  create = async ({ type, comment, screenshot }: CreateFeedbackParams) => {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  };
}
