import { Workbox } from "workbox-window";
export function registerSW() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  const wb = new Workbox("/sw.js");
  wb.addEventListener("waiting", () => wb.messageSW({ type: "SKIP_WAITING" }));
  wb.register();
}
