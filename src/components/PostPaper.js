import React, { useState } from 'react'
import { makeStyles, Paper } from '@material-ui/core';

import PostCard from './PostCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(1),
  },
}));

function PostPaper(props) {
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false)
  const { post } = props

  return (
    <Paper className={classes.paper}>
      {!isEditable
        ? <PostCard 
            post={post}
            setIsEditable={setIsEditable}
          />
        : <p>form</p>
      }
    </Paper>
  )
}

export default PostPaper
