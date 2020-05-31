import React, { useState } from 'react'
import { makeStyles, Paper } from '@material-ui/core';

import PostCard from './PostCard';
import PostForm from './PostForm';

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
      {post && !isEditable
        ? <PostCard post={post} setIsEditable={setIsEditable} />
        : <PostForm post={post} setIsEditable={setIsEditable} />
      }
    </Paper>
  )
}

export default PostPaper
