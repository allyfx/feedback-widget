import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe('Submit Feedback', () => {
  it('should be able to submit a feedbacl', async () => {
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} },
    );

    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Exemple Bug',
      screenshot: 'test.jpg'
    })).resolves.not.toThrow();
  });
});
