import * as ReadableAPI from '../utils/api'

export const GET_POST_COMMENTS = 'GET_COMMENTS'

function getPostComments(comments) {
  return {
    type: GET_POST_COMMENTS,
    comments
  }
}

export function handleGetComments(pid) {
  return dispatch => {
    return ReadableAPI.getPostComments(pid)
      .then(res => dispatch(getPostComments(res)))
  }
}