importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.routing.registerRoute(
  ({url}) => {
    return true
  },
  new workbox.strategies.StaleWhileRevalidate()
);
