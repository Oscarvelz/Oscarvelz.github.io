// Home page only. Never touches the apps (/Numina/, /Anima/, /Psygma/, ...) or Supabase.
const C='home-6';const OWN=['./','./index.html','./manifest.webmanifest','./icon2-192.png','./icon2-512.png','./maskable2-512.png','./icon2-180.png','./numina-icon.png','./anima-icon.png','./sigmind-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(OWN)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('home-')&&x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
 if(u.origin!==location.origin)return;
 const base=new URL('./',self.registration.scope).pathname; const rest=u.pathname.slice(base.length);
 if(rest.includes('/'))return; // any app folder: leave to that app
 e.respondWith(fetch(q).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(q,cp));}return r;}).catch(()=>caches.match(q).then(m=>m||caches.match('./index.html'))));});
