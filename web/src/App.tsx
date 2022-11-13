import React from 'react';
import Router from './router/router'
import Navigation from './components/navigation/navigation';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      {/* <Router></Router> */}
    </div>
  );
}

export default App;
