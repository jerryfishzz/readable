import * as ReadableAPI from '../utils/api'

export const GET_POST_COMMENTS = 'GET_COMMENTS'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'

export function getPostComments(comments) {
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

function upVoteComment(cid) {
  return {
    type: UP_VOTE_COMMENT,
    cid
  }
}

function downVoteComment(cid) {
  return {
    type: DOWN_VOTE_COMMENT,
    cid
  }
}

export function handleUpVoteComment(cid, vote) {
  return dispatch => {
    dispatch(upVoteComment(cid))

    return ReadableAPI.voteComment(cid, vote)
      .catch(err => {
        dispatch(downVoteComment(cid))
        throw err
      })
  }
}

export function handleDownVoteComment(cid, vote) {
  return dispatch => {
    dispatch(downVoteComment(cid))

    return ReadableAPI.voteComment(cid, vote)
      .catch(err => {
        dispatch(upVoteComment(cid))
        throw err
      })
  }
}

function deleteComment(cid) {
  return {
    type: DELETE_COMMENT,
    cid
  }
}

export function handleDeleteComment(cid) {
  return dispatch => {
    return ReadableAPI.deleteComment(cid)
      .then(() => dispatch(deleteComment(cid)))
  }
}

function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function handleUpdateComment(cid, comment) {
  return dispatch => {
    return ReadableAPI.updateComment(cid, comment)
      .then(res => dispatch(updateComment(res)))
  }
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function handleAddComment(comment) {
  return dispatch => {
    return ReadableAPI.addComment(comment)
      .then(res => dispatch(addComment(res)))
  }
}