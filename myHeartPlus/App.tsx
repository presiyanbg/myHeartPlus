import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import DynamicStatusBar from './components/dynamicStatusBar/dynamicStatusBar';
import Home from './components/screens/home/home';
import Authentication from './components/auth/authentication';
export interface IUserAuth {
  firstName: string;
  emailAddress: string;
  authenticated: boolean
}

const App: React.FC = ({ }) => {
  /**
   * User authentication.
   * r
   * Get basic user data when user is authenticated.
   * When is not userAuth is undefined.
   * 
   */
  const [userAuth, setUserAuth] = useState<IUserAuth | undefined>(undefined);

  return (
    <View style={AppStyles.mainView}>
      <DynamicStatusBar ></DynamicStatusBar>
      {userAuth?.authenticated ? <Home appName="myHeart+" navVisible={false} /> : <Authentication></Authentication>}
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


