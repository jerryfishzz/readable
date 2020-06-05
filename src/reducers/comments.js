import { GET_POST_COMMENTS } from "../actions/comments";

export default function comments(state = [], action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return action.comments
    default:
      return state
  }
}