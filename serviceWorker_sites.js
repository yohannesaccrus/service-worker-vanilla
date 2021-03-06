const cacheName = 'v2'

self.addEventListener('install', (e) => {
  console.log('Service worker status: Installed')
})

self.addEventListener('activate', (e) => {
  console.log('Service worker status: Activated')
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker Clearing All Cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', (e) => {
  console.log('Service worker status: Fetching')
  e.respondWith(
    fetch(e.request).then((res) => {
      const resClone = res.clone()

      caches.open(cacheName).then((cache) => {
        cache.put(e.request, resClone)
      })
      return res
    }).catch(err => caches.match(e.request).then(res => res))
  )
})
