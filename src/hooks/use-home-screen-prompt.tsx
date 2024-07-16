import { useEffect, useState } from "react";

export function useAddToHomescreenPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isShow, setIsShow] = useState(true);

  const promptToInstall = () => {
    if (prompt) {
      setIsShow(false);
      return prompt.prompt();
    } else {
      setIsShow(false);
      return alert("이미 설치되었어요!");
    }
  };

  const onClose = () => {
    setIsShow(false);
  };

  useEffect(() => {
    const ready = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", ready as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready as any);
    };
  }, []);

  return { prompt, promptToInstall, isShow, onClose };
}
