import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Main from './Main';
import Header from './Header';
import { handleGetInitialData } from '../actions/shared';
import { Typography } from '@material-ui/core';

function App(props) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => { 
    const { handleGetInitialData } = props

    handleGetInitialData()
      .then(() => setIsReady(true))
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
          {isReady 
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

const mapStatesToProps = ({ categories }) => ({ categories })

export default connect(mapStatesToProps, { handleGetInitialData })(App)
