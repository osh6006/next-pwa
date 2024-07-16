export function isPwa() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
