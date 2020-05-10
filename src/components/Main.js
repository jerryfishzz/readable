import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import SelectMenu from './SelectMenu';
import PostTable from './PostTable';

function Main(props) {
  const { currentCategory } = props

  return (
    <Fragment>
      <SelectMenu selectType="categories" />
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        Talking to the backend yields these categories: <br />
        {currentCategory}
      </p>
      <PostTable />
    </Fragment>
  )
}

const mapStateToProps = ({ categories }, props) => {
  console.log(props)
  const pathName = props.location.pathname
  const currentCategory = pathName === '/'
    ? JSON.stringify(categories)
    : JSON.stringify(categories.filter(cat => cat.path === pathName.slice(1)))

  return {
    currentCategory
  }
}

export default withRouter(connect(mapStateToProps)(Main)) 
