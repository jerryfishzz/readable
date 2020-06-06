import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ThumbDown } from '@material-ui/icons';

import { handleDownVote } from '../actions/posts';
import { handleDownVoteComment } from '../actions/comments';

function Dislike(props) {
  const { id, handleDownVote, handleDownVoteComment, type } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleDownClick = id => {
    setIsLoading(true)

    const vote = {
      option: 'downVote'
    }

    type === 'comment'
      ? handleDownVoteComment(id, vote)
          .then(() => setIsLoading(false))
          .catch(err => {
            alert(err)
            setIsLoading(false)
          })
      : handleDownVote(id, vote)
          .then(() => setIsLoading(false))
          .catch(err => {
            alert(err)
            setIsLoading(false)
          })
  }

  return (
    <IconButton 
      onClick={() => handleDownClick(id)}
      color="primary"
      size="small"
      disabled={isLoading}
    >
      <ThumbDown />
    </IconButton>
  )
}

export default connect(null, { handleDownVote, handleDownVoteComment })(Dislike)