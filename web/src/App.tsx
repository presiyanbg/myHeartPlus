import React from 'react';
import TopNavigation from './components/navigation/topNavigation/topNavigation';
import Monitor from './components/monitor/monitor';
import './App.scss';

function App() {
  return (
    <div className="App">
      <TopNavigation></TopNavigation>
      <Monitor></Monitor>
    </div>
  );
}

export default App;
