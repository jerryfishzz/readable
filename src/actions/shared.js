import * as ReadableAPI from '../utils/api'

import { addPost, updatePost } from './posts'
import { getPostComments } from './comments'

export function handleGetPostAndComments(pid) {
  return async (dispatch, getState) => {
    try {
      const [post, comments] = await ReadableAPI.getPostAndComments(pid)

      const postStatus = {
        post: true,
        comments: true
      }

      if (post.id === undefined) postStatus.post = false
      if (!comments.length) postStatus.comments = false

      const { posts } = getState()
      const pids = posts.map(post => post.id)

      pids.indexOf(pid) === -1 
        ? dispatch(addPost(post)) 
        : dispatch(updatePost(post))
      
      dispatch(getPostComments(comments))

      return postStatus
    } catch (err) {
      throw err
    }
  }
}
