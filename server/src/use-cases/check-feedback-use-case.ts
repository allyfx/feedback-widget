import { FeedbackRepository } from "../repositories/feedbacks-repository";

import AppError from '../utils/AppError';

interface CheckFeedbackUseCaseRequest {
  id: string;
  checked: boolean;
}

export class CheckFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
  ) {}

  async execute(request: CheckFeedbackUseCaseRequest) {
    const { id, checked } = request;

    const feedbackExists = await this.feedbacksRepository.find(id);

    if (!feedbackExists) {
      throw new AppError('Feedback does not exists');
    }

    await this.feedbacksRepository.update({
      id,
      feedback: {
        ...feedbackExists,
        checked,
      }
    });
  }
}