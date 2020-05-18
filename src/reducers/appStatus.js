import { GET_CATEGORIES_READY, SWITCH_SORT, GET_POSTS_READY, LOADING_POSTS, LOADING_CATEGORIES } from "../actions/appStatus";

const initialState = {
  areCategoriesReady: false,
  arePostsReady: false,
  currentSort: 'default'
}

export default function appStatus(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_READY:
      return {
        ...state,
        areCategoriesReady: true
      }
    case GET_POSTS_READY:
      return {
        ...state,
        arePostsReady: true
      }
    case SWITCH_SORT:
      return {
        ...state,
        currentSort: action.sort
      }
    case LOADING_POSTS:
      return {
        ...state,
        arePostsReady: false
      }
    case LOADING_CATEGORIES:
      return {
        ...state,
        areCategoriesReady: false
      }
    default:
      return state
  }
}