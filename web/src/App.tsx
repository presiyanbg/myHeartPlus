import React from 'react';
import Navigation from './components/navigation/navigation';
import Home from './pages/home/home';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Home></Home>
    </div>
  );
}

export default App;
