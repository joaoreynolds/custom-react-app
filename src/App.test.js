import React from 'react'
import {render} from 'testUtils'

import App from './App'

test('It should render the right text', () => {
  const {getByText} = render(<App />)

  const myText = getByText('Go ahead and build anything from here!')

  expect(myText).toBeVisible()
})
