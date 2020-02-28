/**
 * This isn't the actual service worker, but here we register our service worker,
 * and then handle various events that come from the service worker
 *
 * The service worker is created by webpack with the workbox-webpack-plugin
 * Custom service worker code is appended using public/sw.js
 *
 * To poll network status and show a message to users, no need to use service workers.
 * The browser has a native `window.navigator.onLine` or you can use `react-detect-offline`
 * All in all - that's probably best handled outside of this module
 */
export function registerSW(){
  //only do this for production builds
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      //register the service worker created by the webpack workbox-webpack-plugin
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
      navigator.serviceWorker.register(swUrl)
      .then(registration => {

        // You can poll for new updates of our cached assets periodically
        // Calling this function should kick off everything below for us if there are updated assets
        setInterval(() => {
          registration.update()
        }, 3600000) //1 hour

        // Track updates to the Service Worker.
        if (!navigator.serviceWorker.controller) {
          // The window client isn't currently controlled (no service worker present yet) so a new service
          // worker will activate immediately, we can just return here
          return
        }

        // When the user asks to refresh the UI, we'll execute the skipWaiting event
        // which in turn executes the controllerchange event - so in response
        // to that we can reload the window
        var preventDevToolsReloadLoop
        navigator.serviceWorker.addEventListener('controllerchange', function(event) {
          // Ensure refresh is only called once.
          // This works around a bug in "force update on reload".
          if (preventDevToolsReloadLoop) return
          preventDevToolsReloadLoop = true
          window.location.reload(true)
        })

        onNewServiceWorker(registration, function() {
          // show the refresh ui asking the user to update
          showRefreshUI(registration)
          // if you'd rather just refresh the page (and not ask the user) you can
          // just post the message below instead: (keep in mind this might cause the
          // user to lose unsaved data if they input information before a change was detected)
          // registration.waiting.postMessage('skipWaiting')
        })

      })
      .catch(error => {
        console.error('Error during service worker registration:', error)
      })
    })
  }
}

/**
 * This function listens for a changed service worker or an updatefound
 * (updates to any of our newly-downloaded assets will trigger either of these)
 * When installing a new service-worker, this will execute a callback
 * @param  {object}   registration Service worker registration (from browser)
 * @param  {Function} callback     callback function (used to do things like render an "update" UI)
 */
function onNewServiceWorker(registration, callback) {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback()
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', function(event) {
      if (event.target.state === 'installed') {
        // A new service worker is available, execute callback which can be used to inform the user there's a new version
        callback()
      }
    })
  }

  if (registration.installing) {
    return listenInstalledStateChange()
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange)
}

/**
 * Render some UI to tell the user there's an update (or you can use this
 * function to simply update app state, and let the app handle it elsewhere)
 * @param  {object} registration Service worker registration (from browser)
 */
function showRefreshUI(registration) {

  // This demo creates and injects a button.
  var button = document.createElement('button')
  button.style.position = 'absolute'
  button.style.bottom = '24px'
  button.style.left = '24px'
  button.textContent = 'This site has updated. Please click to see changes.'

  button.addEventListener('click', function() {
    if (!registration.waiting) {
      // Just to ensure registration.waiting is available before
      // calling postMessage()
      return
    }

    button.disabled = true

    /*
    Instead of using window.location.reload() here, we can stick with the browser api
    by using postMessage api. We can catch the message event in the public/sw.js file
    which will ultimately trigger the controllerchange event which is handled above.
    This is likely better in case the browser wants to do other stuff related to a changing
    service worker.
    */
    registration.waiting.postMessage('skipWaiting')
  })

  document.body.appendChild(button)
}
