import { isPlainObject } from 'lodash'

const ERROR_DEFAULT = 'An error occurred. Please try again.'
const ERROR_NO_INTERNET = 'Request could not be made. Please check your internet connection.'

export const createWithDoc = ({ envName = '', docFunction = () => {}, component = '' }) => {
  let createComponentWithDoc
  if (envName !== 'production') {
    createComponentWithDoc = docFunction(component) // eslint-disable-line global-require
  }
  return createComponentWithDoc || component
}

export const getErrorMessage = err => {
  // - Axios does not return a response object if the service cannot be reached
  if (!err.response) {
    return ERROR_NO_INTERNET
  }

  // - If we do have a response and data object, use the full error object
  if (err.response && err.response.data) {
    try {
      const errorStringOrObject = Object.values(err.response.data)[0]
      if (isPlainObject(errorStringOrObject)) return errorStringOrObject[0]
      return errorStringOrObject
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Could not infer error message from error response object')
    }
  }

  // If a message has not been set, fallback to our default message
  return ERROR_DEFAULT
}

/**
 * Updates the state object with the updated field.
 * @param {object} state
 * @param {object} updatedField
 */
export const updateState = (state, updatedField) => ({
  ...state,
  ...updatedField,
})

/**
 * Updates an array stored in state.
 * - `add`: adds value to the array
 * - `remote`: removes the value at the index from the array
 * - `update`: updates the value at the index in the array
 * - `reset` and `filter`: returns the supplied value
 * - `clear`: removes all values from the array
 * @param {object} state
 * @param {object} updatedState
 */
export const updateArrayState = (state, { type, value, index }) => {
  switch (type) {
    case 'add':
      return [...state, value]
    case 'remove': {
      const updatedState = [...state]
      updatedState.splice(index, 1)
      return updatedState
    }
    case 'update': {
      const updatedState = [...state]
      updatedState[index] = value
      return updatedState
    }
    case 'reset':
    case 'filter':
      return value
    case 'clear':
      return []
    default:
      return state
  }
}

export const formatTimeText = time => {
  let miliseconds = `0${Math.floor(time / 10) % 100}`.slice(-2)
  let seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2)
  let minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2)
  let hours = `0${Math.floor(time / 3600000)}`.slice(-2)

  return `${hours}:${minutes}:${seconds}.${miliseconds}`
}
