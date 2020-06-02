import React, { useState, Fragment } from 'react'
import { 
  makeStyles, 
  Typography,
  Grid,
  IconButton,
  Divider
} from '@material-ui/core';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { handleDeletePost } from '../actions/posts';
import { showLoadingBar, hideLoadingBar, startDeleting, stopDeleting } from '../actions/appStatus';
import Like from './Like';
import Dislike from './Dislike';

const useStyles = makeStyles((theme) => ({
  generalMargin: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  sidePadding: {
    '& > *': {
      paddingLeft: theme.spacing(1),
      // paddingRight: theme.spacing(1),
    }
  },
  padding: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  title: {
    fontWeight: 700
  },
  flexExtend: {
    flex: 1
  },
  divider: {
    width: '100%'
  },
  iconMargin: {
    '& > *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const { 
    post, 
    setIsEditable, 
    handleDeletePost, 
    showLoadingBar, 
    hideLoadingBar,
    startDeleting, 
    stopDeleting } = props

  const [isPostDeleted, setIsPostDeleted] = useState(false)

  const handleEdit = () => setIsEditable(true)

  const handleDelete = () => {
    startDeleting()
    showLoadingBar()

    handleDeletePost(post.id)
      .then(() => {
        setIsPostDeleted(true)
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
    <Grid container className={classes.generalMargin}>
      {!isPostDeleted
        ? <Fragment>
            <Grid item container alignItems="center">
              <Typography 
                variant="h5" 
                align="left" 
                className={`${classes.flexExtend} ${classes.padding}`}
              >
                {post.title}
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Grid 
                item 
                container 
                xs 
                alignItems="center" 
                className={classes.sidePadding}
              >
                <Typography variant="subtitle1" className={classes.title}>
                  Author
                </Typography>
                <Typography variant="body1">{post.author}</Typography>
              </Grid>
              <Grid 
                item 
                container 
                xs 
                alignItems="center" 
                className={classes.sidePadding}
              >
                <Typography variant="subtitle1" className={classes.title}>
                  Comments
                </Typography>
                <Typography variant="body1">{post.commentCount}</Typography>
              </Grid>
              <Grid 
                item 
                container 
                xs 
                alignItems="center" 
                className={classes.sidePadding}
              >
                <Typography variant="subtitle1" className={classes.title}>
                  Scores
                </Typography>
                <Typography variant="body1">{post.voteScore}</Typography>
              </Grid>
            </Grid>
            <Grid item container className={classes.sidePadding}>
              <Typography variant="body1" align="left">{post.body}</Typography>
            </Grid>
            <Grid item container>
              <Divider className={classes.divider} />
            </Grid>
            <Grid 
              item 
              container 
              alignItems="center" 
              justify="flex-end" 
              className={classes.iconMargin}
            >
              <Like pid={post.id} />
              <Dislike pid={post.id} />
              <IconButton 
                color="primary"
                onClick={handleEdit}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                color="secondary"
                onClick={handleDelete}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Fragment>
        : <Typography variant="body1" align="left">
            This post has been deleted successfully!
          </Typography>
      }
    </Grid>
  )
}

export default connect(
  null, 
  { handleDeletePost, showLoadingBar, hideLoadingBar, startDeleting, stopDeleting }
)(PostCard)