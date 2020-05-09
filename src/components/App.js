import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { handleGetCategories } from '../actions/categories';
import './App.css';
import Main from './Main';

function App(props) {
  useEffect(() => { 
    const { handleGetCategories } = props

    handleGetCategories()
      .catch(err => {
        console.log(err)
      })
  }, [])

  const backend = JSON.stringify(props.categories)

  return (
    <Router>
      <Fragment>
        <CssBaseline />
        <Switch>
          <Route path='/' exact render={() => (<Main backend={backend} />)} />
          <Route path='/react' render={() => (<Main backend="react" />)} />
        </Switch>
      </Fragment>
    </Router>
  );
}

const mapStatesToProps = ({ categories }) => ({ categories })

export default connect(mapStatesToProps, { handleGetCategories })(App)
