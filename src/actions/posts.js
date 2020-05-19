import * as ReadableAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'

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
    return ReadableAPI.votePost(pid, vote)
      .then(() => dispatch(upVote(pid)))
  }
}

export function handleDownVote(pid, vote) {
  return dispatch => {
    return ReadableAPI.votePost(pid, vote)
      .then(() => dispatch(downVote(pid)))
  }
}
