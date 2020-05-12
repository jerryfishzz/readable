import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Main from './Main';
import Header from './Header';
import { handleGetInitialData } from '../actions/shared';
import { Typography } from '@material-ui/core';
import { getReady } from '../actions/appStatus';

function App(props) {
  useEffect(() => { 
    const { handleGetInitialData, getReady } = props

    handleGetInitialData()
      .then(getReady())
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Router>
      <Fragment>
        <CssBaseline />
        <div className="App">
          <Header />
          {props.isReady 
            ? <Switch>
                <Route path='/' exact component={Main} />
                {props.categories.map(category => 
                  <Route key={category.path} path={`/${category.path}`} component={Main} />
                )}
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
  isReady: appStatus.isReady
})

export default connect(mapStatesToProps, { handleGetInitialData, getReady })(App)
