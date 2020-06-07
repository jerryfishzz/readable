import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';

import { handleDeletePost } from '../actions/posts';
import { startDeleting, stopDeleting, showLoadingBar, hideLoadingBar } from '../actions/appStatus';
import { handleDeleteComment } from '../actions/comments';

function DeleteButton(props) {
  const { 
    id,
    type, 
    cb, 
    handleDeletePost, 
    startDeleting, 
    stopDeleting, 
    showLoadingBar, 
    hideLoadingBar,
    handleDeleteComment } = props

  const handleDelete = id => {
    startDeleting()
    showLoadingBar()

    type === 'comment'
      ? handleDeleteComment(id)
          .then(() => {
            alert('Comment has been deleted successfully!')

            stopDeleting()
            hideLoadingBar()
          })
          .catch(err => {
            alert(err)
            stopDeleting()
            hideLoadingBar()
          })
      : handleDeletePost(id)
          .then(() => {
            alert('Post has been deleted successfully!')
            if (cb) cb(true)

            stopDeleting()
            hideLoadingBar()
          })
          .catch(err => {
            alert(err)
            stopDeleting()
            hideLoadingBar()
          })
  }

  return (
    <IconButton 
      onClick={() => handleDelete(id)}
      color="secondary"
      size="small"
    >
      <Delete />
    </IconButton>
  )
}

export default connect(
  null, 
  { 
    handleDeletePost, 
    startDeleting, 
    stopDeleting, 
    showLoadingBar, 
    hideLoadingBar,
    handleDeleteComment
  }
)(DeleteButton)