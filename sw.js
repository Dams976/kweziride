const CACHE = 'kweziride-v1';
const FILES = [
  '/kweziride/',
  '/kweziride/index.html',
  '/kweziride/a-propos.html',
  '/kweziride/contact.html',
  '/kweziride/cookies.html',
  '/kweziride/recrutement.html',
  '/kweziride/KweziRide_CGU.html',
  '/kweziride/KweziRide_Mentions_Legales.html',
  '/kweziride/KweziRide_Conditions_Chauffeurs.html',
  '/kweziride/ChatGPT_Image_1_mars_2026__21_18_18.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
