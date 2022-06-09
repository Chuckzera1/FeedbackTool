import { feedbackTypes, FeedbackTypesEnum } from "..";
import { CloseButton } from "../../CloseButton";
import { FeedbackButton } from "./FeedbackButton";
interface propsParams {
  onFeedbackTypeChange: (key: FeedbackTypesEnum) => void;
}
export function FeedbackTypeStep({ onFeedbackTypeChange }: propsParams) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <FeedbackButton
              key={key}
              title={value.title}
              image={value.image}
              onClickFunc={() => onFeedbackTypeChange(key as FeedbackTypesEnum)}
            />
          );
        })}
      </div>
    </>
  );
}
