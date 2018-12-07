import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import localStorageMock from './localStorageMock'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Mock window.appHistory
 * @type {Object}
 */
window.appHistory = {
  push: jest.fn()
}

/**
 * Mock window.globalFunctions so it can be set in Root
 */
window.globalFunctions = {}

global.mockApiUrl = 'http://localhost:3000'

global.localStorage = localStorageMock

/**
 * This func can be used to get promises inside a component to resolve
 * @type {Function}
 */
global.flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve))
}
