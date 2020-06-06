import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ThumbUp } from '@material-ui/icons';

import { handleUpVote } from '../actions/posts';
import { handleUpVoteComment } from '../actions/comments';

function Like(props) {
  const { id, handleUpVote, handleUpVoteComment, type } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleUpClick = id => {
    setIsLoading(true)

    const vote = {
      option: 'upVote'
    }

    type === 'comment'
      ? handleUpVoteComment(id, vote)
          .then(() => setIsLoading(false))
          .catch(err => {
            alert(err)
            setIsLoading(false)
          })
      : handleUpVote(id, vote)
          .then(() => setIsLoading(false))
          .catch(err => {
            alert(err)
            setIsLoading(false)
          })
  }

  return (
    <IconButton 
      onClick={() => handleUpClick(id)}
      color="primary"
      size="small"
      disabled={isLoading}
    >
      <ThumbUp />
    </IconButton>
  )
}

export default connect(null, { handleUpVote, handleUpVoteComment })(Like)