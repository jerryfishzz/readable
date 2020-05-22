import * as ReadableAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const RESTORE_POST = 'RESTORE_POST'

function getPosts(posts) {
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

function upVote(pid) {
  return {
    type: UP_VOTE,
    pid
  }
}

function downVote(pid) {
  return {
    type: DOWN_VOTE,
    pid
  }
}

export function handleUpVote(pid, vote) {
  return dispatch => {
    dispatch(upVote(pid))

    return ReadableAPI.votePost(pid, vote)
      .catch(err => {
        dispatch(downVote(pid))
        throw err
      })
  }
}

export function handleDownVote(pid, vote) {
  return dispatch => {
    dispatch(downVote(pid))

    return ReadableAPI.votePost(pid, vote)
      .catch(err => {
        dispatch(upVote(pid))
        throw err
      })
  }
}

function deletePost(pid) {
  return {
    type: DELETE_POST,
    pid
  }
}

function restorePost(pid) {
  return {
    type: RESTORE_POST,
    pid
  }
}

export function handleDeletePost(pid) {
  return dispatch => {
    dispatch(deletePost(pid))

    return ReadableAPI.deletePost(pid)
      .catch(err => {
        dispatch(restorePost(pid))
        throw err
      })
  }
}
