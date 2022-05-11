import express from 'express';

import { UseCaseSubmitFeedback } from './use-cases/UseCaseSubmitFeedback';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { NodeMailerMailAdapter } from './adapters/nodemailer/NodeMailerMailAdapter';

export const route = express.Router();

route.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailer = new NodeMailerMailAdapter();

  const useCaseCreateFeedback = new UseCaseSubmitFeedback(
    prismaFeedbackRepository,
    nodemailer
  );

  try {
    await useCaseCreateFeedback.execute({ type, comment, screenshot })
    return res.status(201).send();
    
  } catch (err: any) {
    return res.status(400).json({
      error: err.message
    });
  }
});