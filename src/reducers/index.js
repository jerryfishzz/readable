import { combineReducers } from 'redux';
import categories from './categories'
import posts from './posts'
import appStatus from './appStatus'

export default combineReducers({
  categories,
  posts,
  appStatus
})
