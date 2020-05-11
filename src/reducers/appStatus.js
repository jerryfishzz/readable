import { SWITCH_CATEGORY, GET_READY, SWITCH_SORT } from "../actions/appStatus";

const initialState = {
  isReady: false,
  currentCategory: 'all',
  currentSort: 'default'
}

export default function appStatus(state = initialState, action) {
  switch (action.type) {
    case SWITCH_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      }
    case GET_READY:
      return {
        ...state,
        isReady: true
      }
    case SWITCH_SORT:
      return {
        ...state,
        currentSort: action.sort
      }
    default:
      return state
  }
}