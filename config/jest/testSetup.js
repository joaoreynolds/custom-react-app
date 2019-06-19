import 'jest-dom/extend-expect'
import localStorageMock from './localStorageMock'


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

global.mockApiUrl = process.env.REACT_APP_API_URL.replace(/\/$/, '')

global.localStorage = localStorageMock
