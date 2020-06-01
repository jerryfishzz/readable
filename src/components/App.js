import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { makeStyles, Typography, LinearProgress, Backdrop } from '@material-ui/core';

import './App.css';
import PostList from './PostList';
import Header from './Header';
import { getCategoriesReady } from '../actions/appStatus';
import { handleGetCategories } from '../actions/categories';
import CreatePost from './CreatePost';
import Post from './Post';
import PageNotFound from './PageNotFound';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App(props) {
  const classes = useStyles();

  useEffect(() => { 
    const { getCategoriesReady, handleGetCategories } = props

    handleGetCategories()
      .then(() => {
        getCategoriesReady()
      })
      .catch(err => alert(err))
  }, [])

  return (
    <Router>
      <Fragment>
        <CssBaseline />
        <div className="App">
          <Header />
          {props.isLoadingBarShown && <LinearProgress />}
          <Backdrop className={classes.backdrop} open={props.isDeletingPost}>
            <Typography variant="h4">Deleting post...</Typography>
          </Backdrop>
          {props.areCategoriesReady 
            ? <Switch>
                <Route path='/' exact component={PostList} />
                {props.categories.map(category => 
                  <Route key={category.path} path={`/${category.path}`} component={PostList} />
                )}
                <Route path='/posts/new' component={CreatePost} />
                <Route path='/posts/:pid' component={Post} />
                <Route component={PageNotFound} />
              </Switch>
            : <Typography variant="body1">Loading...</Typography>
          }
        </div>
      </Fragment>
    </Router>
  );
}

const mapStatesToProps = ({ categories, appStatus }) => ({ 
  categories,
  areCategoriesReady: appStatus.areCategoriesReady,
  isLoadingBarShown: appStatus.isLoadingBarShown,
  isDeletingPost: appStatus.isDeletingPost
})

export default connect(
  mapStatesToProps, 
  { getCategoriesReady, handleGetCategories }
)(App)
