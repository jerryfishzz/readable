import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';

import { handleDeletePost } from '../actions/posts';
import { startDeleting, stopDeleting, showLoadingBar, hideLoadingBar } from '../actions/appStatus';

function DeleteButton(props) {
  const { pid, cb, handleDeletePost, startDeleting, stopDeleting, showLoadingBar, hideLoadingBar } = props

  const handleDelete = pid => {
    startDeleting()
    showLoadingBar()

    handleDeletePost(pid)
      .then(() => {
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
      onClick={() => handleDelete(pid)}
      color="secondary"
      size="small"
    >
      <Delete />
    </IconButton>
  )
}

export default connect(null, { handleDeletePost, startDeleting, stopDeleting, showLoadingBar, hideLoadingBar })(DeleteButton)