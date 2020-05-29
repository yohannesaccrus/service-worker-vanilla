if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-test-two/serviceWorker_sites.js')
      .then((reg) => console.log('Service worker status: Registered'))
      .catch((err) => console.log(`Service worker status: Error: ${err}`))
  })
}
