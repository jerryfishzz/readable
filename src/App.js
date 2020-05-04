import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [backend, setBackend] = useState('backend-data');

  useEffect(() => { 
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
    const url = `${api}/categories`;
    console.log('fetching from url', url);
    
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        setBackend(data);
      });
  });

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
