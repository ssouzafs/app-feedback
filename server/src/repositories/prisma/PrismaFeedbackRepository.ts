import { prisma } from "../../prisma";
import { IFeedbackCreateDataType, IFeedbackRepository } from "../FeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {

  /**
   * create feedback with ORM prisma
   * @param param
   */
  async create({ type, comment, screenshot }: IFeedbackCreateDataType) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  }
}