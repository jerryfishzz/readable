import * as ReadableAPI from '../utils/api'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function handleGetCategories() {
  return dispatch => {
    return ReadableAPI.getCategories()
      .then(categories => {
        dispatch(getCategories(categories))
      })
  }
}