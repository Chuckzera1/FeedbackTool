import { ArrowLeft, CircleNotch } from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbackTypes, FeedbackTypesEnum } from "..";
import { api } from "../../../libs/axios";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface propsParams {
  feedbackType: FeedbackTypesEnum;
  resetFeedbackType: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  resetFeedbackType,
  onFeedbackSent,
}: propsParams) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);
    await api
      .post("/feedbacks", {
        type: feedbackType,
        comment: feedbackComment,
        screenshot,
      })
      .then(() => {
        setIsSendingFeedback(false);
        onFeedbackSent();
      })
      .catch((error) => {
        setIsSendingFeedback(false);
      });
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft
            weight="bold"
            className="w-4 h-4"
            onClick={resetFeedbackType}
          />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="feedback-textarea scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(e) => setFeedbackComment(e.target.value)}
        />
        <footer className="flex gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            className="feedback-submit-button feedback-button-focus-style"
            disabled={!feedbackComment.length}
          >
            {isSendingFeedback ? (
              <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
            ) : (
              "Enviar"
            )}
          </button>
        </footer>
      </form>
    </>
  );
}
