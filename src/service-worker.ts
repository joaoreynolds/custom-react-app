/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare const self: ServiceWorkerGlobalScope // eslint-disable-line no-undef

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

// if we detect the SKIP_WAITING message, then we execute skipWaiting (which manually activates a new service worker)
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
