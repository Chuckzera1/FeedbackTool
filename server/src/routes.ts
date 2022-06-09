import { Router } from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackImpl } from "./usecase/submitFeedbackUsecase";

export const routes = Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const mailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUsecase = new SubmitFeedbackImpl(
    prismaFeedbackRepository,
    mailAdapter
  );

  await submitFeedbackUsecase.execute({ type, comment, screenshot });

  return res.status(201).send();
});
