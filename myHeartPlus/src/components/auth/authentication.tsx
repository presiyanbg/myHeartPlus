import React, { useState } from 'react';
import { View } from 'react-native';
import AuthenticationStyles from '../screens/auth/authentication/authenticationStyles';
import Authentication from '../screens/auth/authentication/authentication';
import Login from '../screens/auth/login/login';

type Props = {};

const Auth: React.FC<Props> = ({ }) => {
  const [currentScreen, serCurrentScreen] = useState<string>('Auth');

  const changeScreen = (screen: string | undefined) => {
    if (!screen) serCurrentScreen('Auth');

    if (typeof screen == 'string') {
      serCurrentScreen(screen);
    }
  }

  const screens = {
    'Auth': <Authentication changeScreen={changeScreen}></Authentication>,
    'Login': <Login changeScreen={changeScreen}></Login>
  };

  return (
    <View style={AuthenticationStyles.mainView}>
      {screens[currentScreen]}
    </View>
  );
}

export default Auth;