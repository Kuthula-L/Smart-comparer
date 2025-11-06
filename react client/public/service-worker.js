const CACHE_NAME = 'smartcomparer-v1';
const urlsToCache = [
  '/home',
  '/compare',
  '/basket',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // ❌ Exclude landing page from cache
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return;
  }

  // Serve from cache, then network fallback
  event.respondWith(
    caches.match(request).then(response =>
      response ||
      fetch(request).catch(() => caches.match('/offline.html'))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin === self.location.origin) {
    // cache-first for static assets
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open('static-cache').then(cache => cache.put(event.request, clone));
          return res;
        })
      )
    );
  } else {
    // network-first for APIs
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
self.skipWaiting();
self.clients.claim();