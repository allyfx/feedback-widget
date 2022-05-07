import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

import AppError from '../utils/AppError';

interface SendUserEmailUseCaseRequest {
  feedbackId: string;
  comment: string;
}

export class SendUserEmailUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SendUserEmailUseCaseRequest) {
    const { feedbackId, comment } = request;

    const feedback = await this.feedbacksRepository.find(feedbackId);

    if (!feedback) {
      throw new AppError('Feedback does not exists.');
    }

    if (!feedback.userEmail) {
      throw new AppError('User did not provide email');
    }

    await this.mailAdapter.sendMail({
      email: feedback.userEmail,
      subject: 'Entrando em contato sobre o seu feedback',
      body:  [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${feedback.type}</p>`,
        `<p>Comentário do admin: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}