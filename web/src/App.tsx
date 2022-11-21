import React from 'react';
import TopNavigation from './components/navigation/topNavigation/topNavigation';
import Monitor from './components/monitor/monitor';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <TopNavigation></TopNavigation>
      <Monitor></Monitor>
    </div>
  );
}

export default App;
