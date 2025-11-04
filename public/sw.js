// Service Worker для обхода ngrok warning
self.addEventListener('fetch', (event) => {
  // Добавляем заголовок ngrok-skip-browser-warning ко всем запросам
  const request = event.request;
  const headers = new Headers(request.headers);
  headers.set('ngrok-skip-browser-warning', 'true');
  headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

  const modifiedRequest = new Request(request, {
    headers: headers
  });

  event.respondWith(fetch(modifiedRequest));
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

