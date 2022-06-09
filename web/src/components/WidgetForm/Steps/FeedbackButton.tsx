import { IFeedback } from "..";

interface IPropsParams extends IFeedback {
  onClickFunc: () => void;
}

export function FeedbackButton({ title, image, onClickFunc }: IPropsParams) {
  return (
    <button className="feedback-button" onClick={onClickFunc}>
      <img src={image.source} alt={image.alt} width={30} />
      <span>{title}</span>
    </button>
  );
}
