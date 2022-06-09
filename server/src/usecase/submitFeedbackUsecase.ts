import { MailAdapter } from "../adapters/mailAdapter";
import {
  CreateFeedbackParams,
  FeedbackRepository,
} from "../repositories/feedbacksRepo";

export interface SubmitFeedbackUsecase {
  execute: (params: CreateFeedbackParams) => Promise<void>;
}

export class SubmitFeedbackImpl implements SubmitFeedbackUsecase {
  constructor(
    private readonly feedbackRepo: FeedbackRepository,
    private readonly mailAdapter: MailAdapter
  ) {}
  execute = async ({
    type,
    comment,
    screenshot,
  }: CreateFeedbackParams): Promise<void> => {
    try {
      if (!type) throw new Error("Type is required");
      if (!comment) throw new Error("Comment is required");
      if (screenshot && !screenshot?.startsWith("data:image/png;base64"))
        throw new Error("Invalid screenshot");

      await this.feedbackRepo.create({ type, comment, screenshot });
      await this.mailAdapter.sendEmail({
        subject: "Novo Feedback",
        body: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
          `<p>Tipo do feedback ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
          `<img alt="feedback" src="${screenshot}"/>`,
          `</div>`,
        ].join("\n"),
      });
    } catch (error) {
      console.error(error);
    }
  };
}
