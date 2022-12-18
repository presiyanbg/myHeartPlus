import React, { useEffect } from 'react';
import TopNavigation from './components/navigation/topNavigation/topNavigation';
import Monitor from './components/monitor/monitor';
import './App.scss';
import NavigationContextProvider from './context/navigationContext/navigationContextProvider'
import UserContextProvider from './context/userContext/userContextProvider';
import LoadingContextProvider from './context/loadingContext/loadingContextProvider';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';
import './localization/i18n';
import { useTranslation } from 'react-i18next'
import CommonContextProvider from './context/commonContext/commonContextProvider';

const App = () => {
  const { i18n } = useTranslation();

  /**
   * Change default language on init
   * 
   * @TODO Take language from user or browser data 
   */
  useEffect(() => {
    i18n.changeLanguage("bg");
  }, []);

  return (
    <div className="App">

      {/* Notifications Start */}
      <NotificationContainer />
      {/* Notifications End */}

      {/* Context Providers Start */}
      <CommonContextProvider>
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
      </CommonContextProvider>
      {/* Context Providers End */}
    </div>
  );
}

export default App;
