import { SubmitFeedbackImpl } from "../submitFeedbackUsecase";

const makeTestData = () => {
  const createFeedbackSpy = jest.fn();
  const sendEmailSpy = jest.fn();

  const submitFeedbackUsecase = new SubmitFeedbackImpl(
    { create: createFeedbackSpy },
    { sendEmail: sendEmailSpy }
  );
  return { submitFeedbackUsecase, createFeedbackSpy, sendEmailSpy };
};

describe("Submit Feedback", () => {
  it("Should be able to submit a feedback", async () => {
    const { submitFeedbackUsecase } = makeTestData();

    await expect(
      submitFeedbackUsecase.execute({
        type: "bug",
        comment: "any-comment",
        screenshot: "data:image/png;base64,any-photo.jpg",
      })
    ).resolves.not.toThrow();
  });
  it("Should throw if type is not passed", async () => {
    const { submitFeedbackUsecase } = makeTestData();

    await expect(
      submitFeedbackUsecase.execute({
        type: "",
        comment: "any-comment",
        screenshot: "data:image/png;base64,any-photo.jpg",
      })
    ).rejects.toThrow("Type is required");
  });
  it("Should throw if comment is not passed", async () => {
    const { submitFeedbackUsecase } = makeTestData();

    await expect(
      submitFeedbackUsecase.execute({
        type: "bug",
        comment: "",
        screenshot: "data:image/png;base64,any-photo.jpg",
      })
    ).rejects.toThrow("Comment is required");
  });
  it("Should throw if screenshot is invalid", async () => {
    const { submitFeedbackUsecase } = makeTestData();

    await expect(
      submitFeedbackUsecase.execute({
        type: "bug",
        comment: "any-comment",
        screenshot: "any-photo.jpg",
      })
    ).rejects.toThrow("Invalid screenshot");
  });
  it("Should call create feedback correctly", async () => {
    const { submitFeedbackUsecase, createFeedbackSpy } = makeTestData();

    await submitFeedbackUsecase.execute({
      type: "bug",
      comment: "any-comment",
      screenshot: "data:image/png;base64,any-photo.jpg",
    });

    expect(createFeedbackSpy).toHaveBeenCalledWith({
      type: "bug",
      comment: "any-comment",
      screenshot: "data:image/png;base64,any-photo.jpg",
    });
  });
});
