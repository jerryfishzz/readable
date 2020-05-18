import * as ReadableAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function handleGetPosts(category) {
  return dispatch => category
    ? ReadableAPI.getCategoryPosts(category)
      .then(posts => {
        dispatch(getPosts(posts))
      })
    : ReadableAPI.getAllPosts()
        .then(posts => {
          dispatch(getPosts(posts))
        })
}