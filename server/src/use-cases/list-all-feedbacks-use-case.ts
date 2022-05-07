import { FeedbackRepository } from "../repositories/feedbacks-repository";

export class ListAllFeedbacksUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
  ) {}

  async execute() {
    const feedbacks = await this.feedbacksRepository.list();

    return feedbacks;
  }
}