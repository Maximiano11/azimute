const CACHE = 'azimute-v1';
const ASSETS = ['./','./index.html','./style.css','./script.js','./logo-mark.svg','./logo-horizontal.svg','./manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      if (res.ok && (req.url.includes(self.location.origin) || req.url.includes('tile'))){
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
