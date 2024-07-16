import useDivice from "@/hooks/use-divice";
import { isIOSPromptActive } from "@/utils/common";
import * as React from "react";
import { BeforeInstallPromptEvent } from "../../window";
import { ShareIcon, XIcon } from "lucide-react";

interface IInstallPromptProps {}

const InstallPrompt: React.FunctionComponent<IInstallPromptProps> = () => {
  const { isIOS } = useDivice();
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  console.log(deferredPrompt);

  const handleCancelClick = () => {
    localStorage.setItem("iosCancle", "false");
    setDeferredPrompt(null);
  };

  return (
    <>
      {!deferredPrompt &&
        (isIOS ? (
          <div className="fixed inset-x-0 bottom-0 bg-zinc-800 px-8 py-4 ">
            <h1 className="text-lg">PWA TEST App</h1>
            <span className="flex mt-4 text-sm">
              PWA TEST App의 알림을 받고 더 많은 기능을 사용하고 싶으시면,
            </span>
            <span className="mt-4 flex items-center gap-x-2">
              <ShareIcon size={18} /> 을 눌러 홈 화면에 추가해 보세요
            </span>
            <button
              onClick={() => {}}
              className="aspect-square p-1.5 bg-zinc-600 rounded-md absolute right-4 top-4"
            >
              <XIcon size={20} />
            </button>
          </div>
        ) : (
          <div className="fixed inset-x-0 bottom-0 max-w-[400px] mx-auto bg-zinc-800 px-8 py-4 ">
            <h1 className="text-lg">PWA TEST App</h1>
            <span className="flex mt-4 text-sm">
              PWA TEST App의 알림을 받고 더 많은 기능을 사용하고 싶으시면 앱을
              설치해 주세요!
            </span>
            <div className="flex w-full justify-end">
              <button
                onClick={handleInstallClick}
                className="bg-blue-700 mt-4 rounded-full py-2.5 px-5 font-bold"
              >
                설치하기
              </button>
            </div>
            <button
              onClick={() => {}}
              className="aspect-square p-1.5 bg-zinc-600 rounded-md absolute right-4 top-4"
            >
              <XIcon size={20} />
            </button>
          </div>
        ))}
    </>
  );
};

export default InstallPrompt;
