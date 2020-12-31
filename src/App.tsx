import React, {FC} from 'react'

import './app.css'

const App: FC = () => {

  return (
    <div className="app">
      <div>
        This is the react app. This is an environment variable: {process.env.REACT_APP_API_URL}
      </div>
      <div>
        The sky is the limit. - But the service worker doesn't work!
      </div>
      <div>
        Go ahead and build anything from here!
      </div>
    </div>
  )

}

export default App
