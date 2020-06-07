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

import PostPaper from './PostPaper';
import { hideLoadingBar } from '../actions/appStatus';
import PageNotFound from './PageNotFound';
import CommentTable from './CommentTable';
import { handleGetPostAndComments } from '../actions/shared';
import CommentDialog from './CommentDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),

    '& > *': {
      margin: theme.spacing(1),
    }
  },
  margin: {
    marginLeft: theme.spacing(1),
  },
  commentDialogContainer: {
    paddingTop: theme.spacing(1)
  }
}));

function Post(props) {
  const classes = useStyles();
  const { 
    match: { params }, 
    post, 
    hideLoadingBar, 
    handleGetPostAndComments } = props
  const [isPostReady, setIsPostReady] = useState(false)
  const [isPostExisting, setIsPostExisting] = useState(true)
  const [areCommentsExisting, setAreCommentsExisting] = useState(false)

  useEffect(() => {
    handleGetPostAndComments(params.pid)
      .then(({ post, comments}) => {
        if (post) {
          setIsPostReady(true)
          if(comments) setAreCommentsExisting(true)
        } else {
          setIsPostExisting(false)
        }
          
        hideLoadingBar()
      })
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
              <Grid 
                item 
                container 
                justify="flex-end" 
                className={classes.commentDialogContainer}
              >
                <CommentDialog pid={post.id} />
              </Grid>
              {areCommentsExisting && 
                <Typography 
                  variant="h5" 
                  className={classes.margin}
                >
                  Comments
                </Typography>}
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
    { hideLoadingBar, handleGetPostAndComments }
  )(Post)
)
