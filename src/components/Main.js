import React from 'react'

import Header from './Header';
import SelectMenu from './SelectMenu';

function Main(props) {
  return (
    <div className="App">
      <Header />
      <SelectMenu />
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        Talking to the backend yields these categories: <br />
        {props.backend}
      </p>
    </div>
  )
}

export default Main
