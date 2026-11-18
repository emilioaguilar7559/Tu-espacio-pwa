// Tu Espacio: cache de interfaz. No conserva información privada ni solicitudes de APIs.
const CACHE='tu-espacio-ui-v051';const FILES=['./','./index.html','./manifest.webmanifest','./icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tu-espacio-ui-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{const req=event.request;const url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;const isApp=FILES.some(f=>new URL(f,self.registration.scope).pathname===url.pathname);if(!isApp)return;event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));}return response;}).catch(()=>caches.match(req)));});
