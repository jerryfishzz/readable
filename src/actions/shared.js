import * as ReadableAPI from '../utils/api'
import { getCategories } from './categories'
import { getPosts } from './posts'

export function handleGetInitialData() {
  return dispatch => {
    return ReadableAPI.getInitialData()
      .then(({ categories, posts}) => {
        dispatch(getCategories(categories))
        dispatch(getPosts(posts))
      })
  }
}
