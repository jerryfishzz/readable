import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Typography } from '@material-ui/core';

import './App.css';
import PostList from './PostList';
import Header from './Header';
import { getCategoriesReady } from '../actions/appStatus';
import { handleGetCategories } from '../actions/categories';
import CreatePost from './CreatePost';
import Post from './Post';

function App(props) {
  useEffect(() => { 
    const { getCategoriesReady, handleGetCategories } = props

    handleGetCategories()
      .then(() => getCategoriesReady())
      .catch(err => alert(err))
  }, [])

  return (
    <Router>
      <Fragment>
        <CssBaseline />
        <div className="App">
          <Header />
          {props.areCategoriesReady 
            ? <Switch>
                <Route path='/' exact component={PostList} />
                {props.categories.map(category => 
                  <Route key={category.path} path={`/${category.path}`} component={PostList} />
                )}
                <Route path='/posts/new' component={CreatePost} />
                <Route path='/posts/:pid' component={Post} />
              </Switch>
            : <Typography variant="h4">Loading...</Typography>
          }
        </div>
      </Fragment>
    </Router>
  );
}

const mapStatesToProps = ({ categories, appStatus }) => ({ 
  categories,
  areCategoriesReady: appStatus.areCategoriesReady
})

export default connect(mapStatesToProps, { getCategoriesReady, handleGetCategories })(App)
