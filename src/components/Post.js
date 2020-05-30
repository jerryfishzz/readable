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
import PostCard from './PostCard';

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
  }
}));

function Post(props) {
  const classes = useStyles();
  const { handleGetPost, match: { params }, post } = props
  const [isPostReady, setIsPostReady] = useState(false)

  useEffect(() => {
    handleGetPost(params.pid)
      .then(() => setIsPostReady(true))
      .catch(err => alert(err))
  }, [])

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
              <PostCard post={post} />
            </Grid>
          : <Typography variant="h4">Loading...</Typography>
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

export default withRouter(connect(mapStateToProps, { handleGetPost })(Post))
