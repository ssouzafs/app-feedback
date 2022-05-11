import { UseCaseSubmitFeedback } from "./UseCaseSubmitFeedback";

const submitFeedbackSpay = jest.fn();
const sendMailSpay = jest.fn();

const useCaseSubmitFeedback = new UseCaseSubmitFeedback(
  { create: submitFeedbackSpay },
  { sendMail: sendMailSpay }
);

describe('Submit Feedback', () => {

  it('should be able to submit a feedback', async () => {

    await expect(useCaseSubmitFeedback.execute({
      type: 'BUG',
      comment: 'Ta tudo Bugado',
      screenshot: 'data:image/png;base64test.png'
    })).resolves.not.toThrow();

    expect(submitFeedbackSpay).toHaveBeenCalled();
    expect(sendMailSpay).toHaveBeenCalled();

  });

  it('should not be able to submit a feedback without type', async () => {

    await expect(useCaseSubmitFeedback.execute({
      type: '',
      comment: 'Ta tudo Bugado',
      screenshot: 'data:image/png;base64test.png'
    })).rejects.toThrow();

  });

  it('should not be able to submit a feedback without comment', async () => {

    await expect(useCaseSubmitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64test.png'
    })).rejects.toThrow();

  });

  it('should not be able to submit a feedback without an invalid screenshot', async () => {

    await expect(useCaseSubmitFeedback.execute({
      type: 'BUG',
      comment: 'Screenshot deve ser inválida',
      screenshot: 'test.png assim está invalido'
    })).rejects.toThrow();

  });

});