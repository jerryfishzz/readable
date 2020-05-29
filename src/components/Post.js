import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { 
  makeStyles, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Button,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { handleGetPost } from '../actions/posts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),

    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  formControl: {
    paddingLeft: theme.spacing(1),
    flex: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    textAlign: 'left'
  },
  button: {
    marginTop: theme.spacing(3),
  },
  flexExpand: {
    
  },
  author: {
    paddingRight: theme.spacing(1),
    flex: 1
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
                <ArrowBackIosIcon />
                <Button component={Link} to={`/${post.category}`}>Back to category</Button>
              </Grid>
              <Typography variant="h5" align="right">POST DETAIL</Typography>
              <Grid item container alignItems="center">
                <Typography variant="subtitle1">Title</Typography>
                <Typography>{post.title}</Typography>
              </Grid>
            </Grid>
          : <Typography variant="h4">Loading...</Typography>
        }
      </Grid>
    </Container>
  )
}

const mapStateToProps = ({ categories, posts }, props) => {
  const pathName = props.location.pathname
  // const currentCatObjString = pathName === '/'
  //   ? JSON.stringify(categories)
  //   : JSON.stringify(categories.filter(cat => cat.path === pathName.slice(1)))

  console.log(props.location)

  return {
    // currentCatObjString,
    // arePostsReady: appStatus.arePostsReady,
    // category: pathName.slice(1)
    post: posts.filter(post => post.id === props.match.params.pid)[0]
  }
}

export default withRouter(connect(mapStateToProps, { handleGetPost })(Post))
