/* Static GitHub Pages export. Every path follows this worker's directory. */
const CACHE='elguoshy-static-v19-20261104';
const URL_FOR=path=>new URL(path,self.location.href).href;
const BASE=new URL('./',self.location.href).pathname;
const START=URL_FOR('./index.html');
const CORE=['./','./index.html','./style.css?v=19','./app.js?v=19','./data.js?v=18','./media.js','./services.js','./portrait-light.js?v=15','./static-app.js?v=19','./manifest.webmanifest','./offline.html','./assets/app-icon-192.png','./assets/app-icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE.map(URL_FOR)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith('elguoshy-static-')&&name!==CACHE)await caches.delete(name);
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(BASE)||url.pathname.endsWith('/sw.js'))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const response=await fetch(request);
      if(response.ok&&!response.redirected){
        const saved=response.clone();event.waitUntil(cache.put(request,saved));
      }
      return response;
    }catch{
      return await cache.match(request)||(request.mode==='navigate'?await cache.match(START):null)||Response.error();
    }
  })());
});
