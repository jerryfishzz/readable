import React, { useEffect, Fragment } from 'react';
import logo from '../logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { handleGetCategories } from '../actions/categories';
import CssBaseline from '@material-ui/core/CssBaseline';

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
    <Fragment>
      <CssBaseline />
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br />
          {backend}
        </p>
      </div>
    </Fragment>
  );
}

const mapStatesToProps = ({ categories }) => ({ categories })

export default connect(mapStatesToProps, { handleGetCategories })(App)
