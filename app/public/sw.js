/* global workbox */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js");
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
workbox.routing.registerRoute(
  ({ request }) => request.destination === "document",
  new workbox.strategies.NetworkFirst({ cacheName: "pages" })
);
workbox.routing.registerRoute(
  ({ request }) => ["style","script","worker"].includes(request.destination),
  new workbox.strategies.StaleWhileRevalidate({ cacheName: "assets" })
);
