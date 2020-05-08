import { GET_CATEGORIES } from "../actions/categories"

const initialState = {
  categories: [],
  posts: [],
  comments: []
}

export default function readable(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}