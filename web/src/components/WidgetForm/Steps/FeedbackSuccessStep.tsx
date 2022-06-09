import { CloseButton } from "../../CloseButton";

import successImage from "../../../assets/success.svg";

interface propsParams {
  onFeedbackRestartRequest: () => void;
}

export function FeedbackSuccessStep({ onFeedbackRestartRequest }: propsParams) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className="flex flex-col items-center py-10 w-[304px]">
        <img src={successImage} width={41} height={40} />
        <span className="text-xl mt-2">Agradecemos o feedback</span>
        <button
          className="py-2 px-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors feedback-button-focus-style"
          onClick={onFeedbackRestartRequest}
        >
          Enviar outro
        </button>
      </div>
    </>
  );
}
