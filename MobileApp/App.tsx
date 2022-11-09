import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import i18n from './src/i18n/i18n';
import DynamicStatusBar from './src/components/dynamicStatusBar/dynamicStatusBar';
import Home from './src/components/screens/home/home';
import Auth from './src/components/auth/authentication';
import './src/localization/i18n';
export interface IUserAuth {
  firstName: string;
  emailAddress: string;
  authenticated: boolean
}

const App: React.FC = ({ }) => {
  /**
   * User authentication.
   * 
   * Get basic user data when user is authenticated.
   * When is not userAuth is undefined.
   * 
   */
  const [userAuth, setUserAuth] = useState<IUserAuth | undefined>(undefined);

  return (
    <View style={AppStyles.mainView}>
      <DynamicStatusBar ></DynamicStatusBar>
      {userAuth?.authenticated ? <Home appName="myHeart+" navVisible={false} /> : <Auth></Auth>}
    </View>
  );
};

export default App;

const AppStyles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: "#2e86de",
  }
});


