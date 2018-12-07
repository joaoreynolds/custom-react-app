import React, { Component } from 'react'

import './app.css'

class App extends Component {

  render() {
    return (
      <div className="app">
        <div>
          This is the react app. This is an environment variable: {process.env.REACT_APP_API_URL}
        </div>
        <div>
          Go ahead and build anything from here!
        </div>
      </div>
    )
  }

}

export default App
