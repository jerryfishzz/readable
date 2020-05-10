import { SWITCH_CATEGORY } from "../actions/appStatus";

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
    default:
      return state
  }
}