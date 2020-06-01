import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { 
  makeStyles,
  Typography, 
  Button,
  Container,
  Grid
} from '@material-ui/core';

import CategoryDropDown from './CategoryDropDown';
import PostTable from './PostTable';
import SortDropDown from './SortDropDown';
import { handleGetPosts } from '../actions/posts';
import { getPostsReady, hideLoadingBar } from '../actions/appStatus';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  navigation: {
    width: '60%'
  }
}));

function PostList(props) {
  const classes = useStyles();

  const { currentCatObjString, arePostsReady, category, handleGetPosts, getPostsReady, hideLoadingBar } = props

  useEffect(() => {
    handleGetPosts(category)
      .then(() => {
        getPostsReady()
        hideLoadingBar()
      })
      .catch(err => alert(err))
  }, [])

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item container justify="space-between" alignItems="center" className={classes.navigation}>
          <CategoryDropDown />
          <Button 
            variant="contained"
            component={Link} 
            to={category === '' ? '/posts/new' : `/posts/new?category=${category}`}
          >
            Add Post
          </Button>
        </Grid>
      </Grid>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        Talking to the backend yields these categories: <br />
        {currentCatObjString}
      </p>
      <Grid container justify="flex-end">
        <SortDropDown />
      </Grid>
      {arePostsReady
        ? <PostTable />
        : <Typography variant="h4">Loading...</Typography>
      }
    </Container>
  )
}

const mapStateToProps = ({ categories, appStatus }, props) => {
  const pathName = props.location.pathname
  const currentCatObjString = pathName === '/'
    ? JSON.stringify(categories)
    : JSON.stringify(categories.filter(cat => cat.path === pathName.slice(1)))

  return {
    currentCatObjString,
    arePostsReady: appStatus.arePostsReady,
    category: pathName.slice(1)
  }
}

export default withRouter(connect(mapStateToProps, { handleGetPosts, getPostsReady, hideLoadingBar })(PostList)) 
