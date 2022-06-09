import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface propsParams {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  onScreenshotTook,
  screenshot,
}: propsParams) {
  const [isLoadingScreenShot, setIsLoadingScreenshot] = useState(false);
  async function handleTakeScreenshot() {
    setIsLoadingScreenshot(true);
    const html = document.querySelector("html");

    if (!html) {
      console.log(
        "Não possível tirar foto. Por favor, atualize a página ou detalhe o problema na area de texto"
      );
      return;
    }

    const canvas = await html2canvas(html);
    const base64image = canvas.toDataURL("image/pgn");
    onScreenshotTook(base64image);
    setIsLoadingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 rounded-md h-10 border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="feedback-photo-button feedback-button-focus-style"
      onClick={handleTakeScreenshot}
    >
      {isLoadingScreenShot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
