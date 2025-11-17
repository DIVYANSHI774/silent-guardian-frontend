/* eslint-disable no-restricted-globals */

const CACHE_NAME = "silent-guardian-cache-v1";
const urlsToCache = ["/", "/index.html", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => res || caches.match("/offline.html"))
    )
  );
});

self.addEventListener("activate", (event) => {
  const whitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((name) => !whitelist.includes(name) && caches.delete(name)))
    )
  );
});
