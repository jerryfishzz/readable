import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core';

import CategoryDropDown from './CategoryDropDown';
import PostTable from './PostTable';
import SortDropDown from './SortDropDown';
import { handleGetPosts } from '../actions/posts';
import { getPostsReady } from '../actions/appStatus';

function PostList(props) {
  const { currentCatObjString, arePostsReady, category, handleGetPosts, getPostsReady } = props

  useEffect(() => {
    handleGetPosts(category)
      .then(() => getPostsReady())
      .catch(err => alert(err))
  }, [])

  return (
    <Fragment>
      <CategoryDropDown />
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        Talking to the backend yields these categories: <br />
        {currentCatObjString}
      </p>
      <SortDropDown />
      {arePostsReady
        ? <PostTable />
        : <Typography variant="h4">Loading...</Typography>
      }
    </Fragment>
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

export default withRouter(connect(mapStateToProps, { handleGetPosts, getPostsReady })(PostList)) 
