import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

import { handleGetPost } from '../actions/posts';

function Post(props) {
  const { handleGetPost, match: { params } } = props

  useEffect(() => {
    handleGetPost(params.pid)
      // .then(() => getPostsReady())
      .catch(err => alert(err))
  }, [])

  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = ({ categories, appStatus }, props) => {
  const pathName = props.location.pathname
  // const currentCatObjString = pathName === '/'
  //   ? JSON.stringify(categories)
  //   : JSON.stringify(categories.filter(cat => cat.path === pathName.slice(1)))

  console.log(props.location)

  return {
    // currentCatObjString,
    // arePostsReady: appStatus.arePostsReady,
    // category: pathName.slice(1)
  }
}

export default withRouter(connect(mapStateToProps, { handleGetPost })(Post))
