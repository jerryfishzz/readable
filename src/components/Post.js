import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { 
  makeStyles, 
  Typography,
  Container,
  Grid,
  IconButton
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { handleGetPost } from '../actions/posts';
import PostPaper from './PostPaper';
import { hideLoadingBar } from '../actions/appStatus';
import PageNotFound from './PageNotFound';
import { getPostComments } from '../utils/api';
import { handleGetComments } from '../actions/comments';
import CommentTable from './CommentTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    paddingTop: theme.spacing(2),

    '& > *': {
      margin: theme.spacing(1),
    }
  },
  margin: {
    marginLeft: theme.spacing(1),
  },
  commentTitle: {
    marginTop: theme.spacing(3),
  }
}));

function Post(props) {
  const classes = useStyles();
  const { handleGetPost, match: { params }, post, hideLoadingBar, handleGetComments } = props
  const [isPostReady, setIsPostReady] = useState(false)
  const [isPostExisting, setIsPostExisting] = useState(true)

  useEffect(() => {
    handleGetPost(params.pid)
      .then(({ post }) => {
        // console.log(post)
        post.id ? setIsPostReady(true) : setIsPostExisting(false)
        hideLoadingBar()

        // Return a promise of dispatching action of getting comments or null (blank array)
        return post.id ? handleGetComments(post.id) : post.id
      })
      .then(res => console.log(res))
      .catch(err => {
        // console.log(err)
        alert(err)
      })
  }, [])

  if (!isPostExisting) return <PageNotFound />

  return (
    <Container maxWidth="lg" >
      <Grid container justify="center">
        {isPostReady
          ? <Grid item container className={classes.root}>
              <Grid item container alignItems="center">
                <IconButton component={Link} to={`/${post.category}`}>
                  <NavigateBeforeIcon />
                </IconButton>
                <Typography variant="button" className={classes.margin}>Back to category</Typography>
              </Grid>
              <PostPaper post={post} />
              <Typography variant="h5" className={`${classes.margin} ${classes.commentTitle}`}>Comments</Typography>
              <CommentTable />
            </Grid>
          : <Typography variant="body1">Loading...</Typography>
        }
      </Grid>
    </Container>
  )
}

const mapStateToProps = ({ posts }, props) => {
  return {
    post: posts.filter(post => post.id === props.match.params.pid)[0]
  }
}

export default withRouter(
  connect(
    mapStateToProps, 
    { handleGetPost, hideLoadingBar, handleGetComments }
  )(Post)
)
