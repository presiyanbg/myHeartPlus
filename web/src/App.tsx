import React from 'react';
import TopNavigation from './components/navigation/topNavigation/topNavigation';
import Home from './pages/home/home';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <TopNavigation></TopNavigation>
      <Home></Home>
    </div>
  );
}

export default App;
