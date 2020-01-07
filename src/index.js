import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { registerSW } from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// Calling this will register the service worker for this app
// Out of the box, this service worker is bootstrapped with the ability
// To cache assets, and serve them first, and can be used to prompt users to reload
// when there are updates. You should go through ./serviceWorker.js to customize how you want to handle that
registerSW()
