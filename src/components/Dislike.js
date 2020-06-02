import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ThumbDown } from '@material-ui/icons';

import { handleDownVote } from '../actions/posts';

function Dislike(props) {
  const { pid, handleDownVote } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleDownClick = pid => {
    setIsLoading(true)

    const vote = {
      option: 'downVote'
    }

    handleDownVote(pid, vote)
      .then(() => setIsLoading(false))
      .catch(err => {
        alert(err)
        setIsLoading(false)
      })
  }

  return (
    <IconButton 
      onClick={() => handleDownClick(pid)}
      color="primary"
      size="small"
      disabled={isLoading}
    >
      <ThumbDown />
    </IconButton>
  )
}

export default connect(null, { handleDownVote })(Dislike)