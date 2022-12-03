import React from 'react';
import TopNavigation from './components/navigation/topNavigation/topNavigation';
import Monitor from './components/monitor/monitor';
import './App.scss';
import NavigationContextProvider from './context/navigationContext/navigationContextProvider'
import UserContextProvider from './context/userContext/userContextProvider';

const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <NavigationContextProvider>
          <TopNavigation></TopNavigation>
          <Monitor></Monitor>
        </NavigationContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
