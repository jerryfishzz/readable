import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Main from './Main';
import { handleGetInitialData } from '../actions/shared';

function App(props) {
  useEffect(() => { 
    const { handleGetInitialData } = props

    handleGetInitialData()
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Router>
      <Fragment>
        <CssBaseline />
        <Switch>
          <Route path='/' exact component={Main} />
          {props.categories.map(category => 
            <Route key={category.path} path={`/${category.path}`} component={Main} />
          )}
        </Switch>
      </Fragment>
    </Router>
  );
}

const mapStatesToProps = ({ categories }) => ({ categories })

export default connect(mapStatesToProps, { handleGetInitialData })(App)
