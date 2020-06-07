import { GET_POST_COMMENTS, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, ADD_COMMENT } from "../actions/comments";

export default function comments(state = [], action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return action.comments
    case UP_VOTE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.cid) {
          return {
            ...comment,
            voteScore: comment.voteScore + 1
          }
        }
        return comment
      })
    case DOWN_VOTE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.cid) {
          return {
            ...comment,
            voteScore: comment.voteScore - 1
          }
        }
        return comment
      })
    case DELETE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.cid) {
          return {
            ...comment,
            deleted: true
          }
        }
        return comment
      })
    case UPDATE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          return action.comment
        }
        return comment
      })
    case ADD_COMMENT:
      return [...state, action.comment]
    default:
      return state
  }
}