import { SWITCH_CATEGORY, GET_READY } from "../actions/appStatus";

const initialState = {
  isReady: false,
  currentCategory: 'all'
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
    default:
      return state
  }
}