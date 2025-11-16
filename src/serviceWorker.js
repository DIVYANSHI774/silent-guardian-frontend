// Silent Guardian – Service Worker (PWA Offline Support)

// Cache name and app assets
const CACHE_NAME = "silent-guardian-v1";
const ASSETS = [
  "/",                // main entry
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
];

// Install event – cache essential files
self.addEventListener("install", (event) => {
  console.log("🛠️ Installing service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate event – clear old caches
self.addEventListener("activate", (event) => {
  console.log("⚡ Service worker activated!");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch event – serve cached files offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (cached) => cached || fetch(event.request).catch(() => caches.match("/index.html"))
    )
  );
});
