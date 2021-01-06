/* eslint @typescript-eslint/ban-ts-comment: 0 */
import {Workbox, messageSW} from 'workbox-window'

const isProduction = process.env.NODE_ENV === 'production'

export function registerSW(){
  if (isProduction && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      //register the service worker
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
      const wb = new Workbox(swUrl)

      let registration: ServiceWorkerRegistration
      let refreshing = false

      const showSkipWaitingPrompt = () => {
        // `event.wasWaitingBeforeRegister` will be false if this is
        // the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously
        // updated service worker is still waiting (from a former load)
        // "You may want to customize the UI prompt accordingly." - but I don't know how it would differ
    
        // Assumes your app has some sort of prompt UI element
        // that a user can either accept or reject.
        showRefreshUI({
          onAccept: async () => {
            // Assuming the user accepted the update, set up a listener
            // that will reload the page as soon as the previously waiting
            // service worker has taken control.
            
            // wb.addEventListener('controlling', () => {
            //   // this might be redundant with the event listener declared below, so it's commented out
            //   if (refreshing){
            //     // Ensure refresh is only called once.
            //     // This works around a bug in "force update on reload".
            //     return
            //   }
            //   refreshing = true
            //   window.location.reload()
            // })
    
            if (registration && registration.waiting) { // Just to ensure registration.waiting is available
              // Send a message to the waiting service worker,
              // instructing it to activate.
              // Note: for this to work, you have to add a message
              // listener in your service worker. (in service-worker.js)
              messageSW(registration.waiting, {type: 'SKIP_WAITING'})
            }
          }
        })
      }
    
      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener('waiting', showSkipWaitingPrompt)
      // @ts-ignore - workbox docs says to include this event, even though ts is telling us it's not an option
      wb.addEventListener('externalwaiting', showSkipWaitingPrompt)

      // this watches for if the service worker changes (skipWaiting was called in ANY tab)
      wb.addEventListener('controlling', function() { // workbox controlling is same as controllerchanged
        // Ensure refresh is only called once.
        // This works around a bug in "force update on reload".
        if (refreshing) return
        refreshing = true
        window.location.reload()
      })
      
      // register the service worker and assign it to our registration variable
      wb.register().then((myRegistration) => {
        registration = myRegistration

        // You can poll for new updates of our cached assets periodically
        // Calling this function should kick off everything below for us if there are updated assets
        setInterval(() => {
          registration.update()
        }, 3600000) //1 hour
      })
    })
    
  }
}

/**
 * Render some UI to tell the user there's an update (or you can use this
 * function to simply update app state, and let the app handle it elsewhere)
 * @param  {object} registration Service worker registration (from browser)
 */
function showRefreshUI({onAccept}: {onAccept: () => void}): void {

  // This demo creates and injects a button.
  const button = document.createElement('button')
  button.style.position = 'absolute'
  button.style.bottom = '24px'
  button.style.left = '24px'
  button.textContent = 'This site has updated. Please click to see changes. - this will reload all tabs, make sure changes are saved first.'

  button.addEventListener('click', function() {
    button.disabled = true
    onAccept()
  })

  document.body.appendChild(button)
}
