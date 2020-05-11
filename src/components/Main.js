import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import CategoryDropDown from './CategoryDroipDown';
import PostTable from './PostTable';
import SortDropDown from './SortDropDown';

function Main(props) {
  const { currentCategory } = props

  return (
    <Fragment>
      <CategoryDropDown />
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        Talking to the backend yields these categories: <br />
        {currentCategory}
      </p>
      <SortDropDown />
      <PostTable />
    </Fragment>
  )
}

const mapStateToProps = ({ categories }, props) => {
  const pathName = props.location.pathname
  const currentCategory = pathName === '/'
    ? JSON.stringify(categories)
    : JSON.stringify(categories.filter(cat => cat.path === pathName.slice(1)))

  return {
    currentCategory
  }
}

export default withRouter(connect(mapStateToProps)(Main)) 
