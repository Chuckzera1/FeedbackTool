import { useState } from "react";
import { CloseButton } from "../CloseButton";
import { FeedbackButton } from "./Steps/FeedbackButton";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeSteps";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export enum FeedbackTypesEnum {
  BUG = "bug",
  IDEA = "idea",
  OTHER = "other",
}
interface IImage {
  source: string;
  alt: string;
}
export interface IFeedback {
  title: string;
  image: IImage;
}
export const feedbackTypes: { [key in FeedbackTypesEnum]: IFeedback } = {
  bug: {
    title: "Bug",
    image: {
      alt: "Imagem de um inseto",
      source: bugImageUrl,
    },
  },
  idea: {
    title: "Ideia",
    image: {
      alt: "Imagem de uma lampada",
      source: ideaImageUrl,
    },
  },
  other: {
    title: "Outro",
    image: {
      alt: "Imagem de uma nuvem de pensamento",
      source: thoughtImageUrl,
    },
  },
};
export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypesEnum | null>(
    null
  );
  const [feedbackSent, setFeedbackSent] = useState(false);

  const restartFeedbackType = () => {
    setFeedbackSent(false);
    setFeedbackType(null);
  };

  return (
    <div className="widget-form">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={restartFeedbackType} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              resetFeedbackType={restartFeedbackType}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ❤ pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
