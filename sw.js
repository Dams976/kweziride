const CACHE = 'kweziride-v3';

const FILES = [
  '/',
  '/index.html',
  '/a-propos.html',
  '/contact.html',
  '/cookies.html',
  '/recrutement.html',
  '/tarifs.html',
  '/actualites.html',
  '/404.html',
  '/KweziRide_CGU.html',
  '/KweziRide_Mentions_Legales.html',
  '/KweziRide_Conditions_Chauffeurs.html',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-48x48.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.all(
        FILES.map(url =>
          fetch(url)
            .then(res => { if (res.ok) return cache.put(url, res); })
            .catch(() => {})
        )
      );
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request)
        .then(res => {
          const sameOrigin = e.request.url.startsWith(self.location.origin);
          const isIconFont = e.request.url.includes('jsdelivr.net');
          if (res.ok && (sameOrigin || isIconFont)) {
            const resClone = res.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, resClone));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
