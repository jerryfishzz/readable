import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './App.css';
import { getCategories } from '../utils/api';

function App() {
  const [backend, setBackend] = useState('backend-data');

  useEffect(() => { 
    getCategories()
      .then(categories => setBackend(JSON.stringify(categories.data)))
      .catch(err => {
        console.log(err)
      })
  })

  return (
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
  );
}

export default App;
