import { IMailAdapter } from "../adapters/MailAdapter";
import { IFeedbackRepository } from "../repositories/FeedbackRepository";

interface UseCaseSubmitFeedbackDataType {
  type: string;
  comment: string;
  screenshot?: string
}

export class UseCaseSubmitFeedback {

  constructor(
    private feedbackRepository: IFeedbackRepository,
    private mailAdapter: IMailAdapter
  ) { }

  /**
   * Execute the creation of new feedback call repository interface.
   * @param request 
   */
  async execute(request: UseCaseSubmitFeedbackDataType) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required...");
    }

    if (!comment) {
      throw new Error("Comment is required...");
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error("Invalid screenshot format...");
    }

    this.feedbackRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo e-mail  de feedback",
      body: [
        `<div style="font-family:sans-serif; font-size:16px; color:#111;">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Feedback: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" width="1300"/>` : null,
        `</div>`
      ].join('\n')
    });
  }
}