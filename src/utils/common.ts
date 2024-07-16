import { BeforeInstallPromptEvent } from "../../window";

export function isPwa() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const defaultBeforeInstallPromptEvent: BeforeInstallPromptEvent = {
  platforms: [],
  userChoice: Promise.resolve({ outcome: "dismissed", platform: "" }),
  prompt: () => Promise.resolve(),
  preventDefault: () => {},
};

export function isIOSPromptActive() {
  const isActive = JSON.parse(localStorage.getItem("iosCancle") || "true");

  if (isActive) {
    return defaultBeforeInstallPromptEvent;
  }

  return null;
}
