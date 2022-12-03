import React from 'react';
import TopNavigation from './components/navigation/topNavigation/topNavigation';
import Monitor from './components/monitor/monitor';
import './App.scss';
import NavigationContextProvider from './context/navigationContext/navigationContextProvider'
import UserContextProvider from './context/userContext/userContextProvider';
import LoadingContextProvider from './context/loadingContext/loadingContextProvider';

const App = () => {
  return (
    <div className="App">
      {/* Context Providers Start */}
      <LoadingContextProvider>
        <UserContextProvider>
          <NavigationContextProvider>

            {/* Components Start */}
            <TopNavigation></TopNavigation>
            <Monitor></Monitor>
            {/* Components End */}

          </NavigationContextProvider>
        </UserContextProvider>
      </LoadingContextProvider>
      {/* Context Providers End */}
    </div>
  );
}

export default App;
