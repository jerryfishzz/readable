import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ThumbUp } from '@material-ui/icons';

import { handleUpVote } from '../actions/posts';

function Like(props) {
  const { pid, handleUpVote } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleUpClick = pid => {
    setIsLoading(true)

    const vote = {
      option: 'upVote'
    }

    handleUpVote(pid, vote)
      .then(() => setIsLoading(false))
      .catch(err => {
        alert(err)
        setIsLoading(false)
      })
  }

  return (
    <IconButton 
      onClick={() => handleUpClick(pid)}
      color="primary"
      size="small"
      disabled={isLoading}
    >
      <ThumbUp />
    </IconButton>
  )
}

export default connect(null, { handleUpVote })(Like)