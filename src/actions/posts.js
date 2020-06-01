import * as ReadableAPI from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'

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

export function handleDeletePost(pid) {
  return dispatch => {
    return ReadableAPI.deletePost(pid)
      .then(() => dispatch(deletePost(pid)))
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function handleAddPost(post) {
  return dispatch => {
    return ReadableAPI.addPost(post)
      .then(res => dispatch(addPost(res)))
  }
}

function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

// Note, when a post is deleted (deleted as true), the api will retun a empty object instead of giving an error since the post is still there.
export function handleGetPost(pid) {
  return (dispatch, getState) => {
    return ReadableAPI.getPost(pid)
      .then(res => {
        // console.log(res)
        const { posts } = getState()
        const pids = posts.map(post => post.id)

        return pids.indexOf(pid) === -1 ? dispatch(addPost(res)) : dispatch(updatePost(res))
      })
  }
}

export function handleUpdatePost(pid, post) {
  return dispatch => {
    return ReadableAPI.updatePost(pid, post)
      .then(res => dispatch(updatePost(res)))
  }
}
