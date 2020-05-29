const cacheName = 'v1'

const cacheAssets = [
  '/service-test-two/index.html',
  '/service-test-two/pages/contact.html',
  '/service-test-two/assets/style/style.css',
  '/service-test-two/service/main.js',
]

self.addEventListener('install', (e) => {
  console.log('Service worker: Installed')

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files...')
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  console.log('Service worker: Activated')
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
  console.log('Service Worker: Fetching')
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})
