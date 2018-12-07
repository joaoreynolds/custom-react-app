/**
 * Since our service worker is created dynamically in webpack, we need to use this
 * file to include other service-worker functions that are custom-made
 * This file is imported into the main service-worker via the webpack plugin config
 */
if (workbox) {
  // by handling the skipWaiting message event, we can execute the
  // ServiceWorkerGlobalScope.skipWaiting() function, which forces a new (waiting)
  // service worker to become the active service worker. This will broadcast a
  // `controllerchange` even which is handled within the app to force a reload of the site
  self.addEventListener('message', (event) => {
    if (!event.data){
      return;
    }
    switch (event.data) {
      case 'skipWaiting':
        self.skipWaiting();
        break;
      default:
        // NOOP
        break;
    }
  })
}
