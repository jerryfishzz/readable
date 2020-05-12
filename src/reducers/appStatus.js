import { GET_READY, SWITCH_SORT } from "../actions/appStatus";

const initialState = {
  isReady: false,
  currentSort: 'default'
}

export default function appStatus(state = initialState, action) {
  switch (action.type) {
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