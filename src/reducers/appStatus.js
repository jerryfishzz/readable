import { 
  GET_CATEGORIES_READY, 
  SWITCH_SORT, 
  GET_POSTS_READY, 
  LOADING_POSTS, 
  LOADING_CATEGORIES, 
  START_LOADING, 
  STOP_LOADING,
  SHOW_LOADING_BAR,
  HIDE_LOADING_BAR
} from "../actions/appStatus";

const initialState = {
  areCategoriesReady: false,
  arePostsReady: false,
  currentSort: 'default',
  isLoading: false, // Response for async
  showLoadingBar: true // Response for both app initializing and async
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
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    case SHOW_LOADING_BAR:
      return {
        ...state,
        showLoadingBar: true
      }
    case HIDE_LOADING_BAR:
      return {
        ...state,
        showLoadingBar: false
      }
    default:
      return state
  }
}