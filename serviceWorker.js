self.skipWaiting();

const version = 1;

const appCache = caches.open(`cahce_${version}`);

const staticCoffees = 'coffees';
const assets = [
  "/",
  "/manifest.json",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg",
  "/images/icon-192.png",
];

self.addEventListener('install', (event) => {
  console.log('Install event', event);
  event.waitUntil(
    appCache.open(staticCoffees).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener('activate', (event) => {
  console.log(event);
});

self.addEventListener('fetch', (event) => {
  {/* Cache only */}
  // event.respondWith(
  //   appCache.match(event.request).then((response) => {
  //     return response;
  //   })
  // );

  // Network only
  // event.respondWith(
  //   appCache.match(event.request).then((response) => {
  //     return fetch(event.request);
  //   })
  // );

  // Cache first, falling back to network
  event.respondWith(
    appCache.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', event => {
  const payload = event.data.json();
  const options = {
    body: payload.body,
    icon: '/images/icon-192.jpg', // You can customize the notification icon
    vibrate: [200, 100, 200], // Vibration pattern
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});
