import * as ReadableAPI from '../utils/api'

export const GET_CATEGORIES = 'GET_CATEGORIES'

function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function handleGetCategories() {
  return async dispatch => {
    try {
      const categories = await ReadableAPI.getCategories()

      dispatch(getCategories(categories))
    } catch (err) {
      throw err
    }
  }
}