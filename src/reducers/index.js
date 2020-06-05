import { combineReducers } from 'redux';
import categories from './categories'
import posts from './posts'
import appStatus from './appStatus'
import comments from './comments';

export default combineReducers({
  categories,
  posts,
  appStatus,
  comments
})
