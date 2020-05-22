import { GET_POSTS, UP_VOTE, DOWN_VOTE, DELETE_POST, RESTORE_POST } from "../actions/posts"

export default function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts
    case UP_VOTE:
      return state.map(post => {
        if (post.id === action.pid) {
          return {
            ...post,
            voteScore: post.voteScore + 1
          }
        }
        return post
      })
      case DOWN_VOTE:
        return state.map(post => {
          if (post.id === action.pid) {
            return {
              ...post,
              voteScore: post.voteScore - 1
            }
          }
          return post
        })
      case DELETE_POST:
        return state.map(post => {
          if (post.id === action.pid) {
            return {
              ...post,
              deleted: true
            }
          }
          return post
        })
      case RESTORE_POST:
        return state.map(post => {
          if (post.id === action.pid) {
            return {
              ...post,
              deleted: false
            }
          }
          return post
        })
    default:
      return state
  }
}