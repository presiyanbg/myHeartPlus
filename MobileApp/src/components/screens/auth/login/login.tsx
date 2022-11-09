import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import AuthenticationStyles from '../authentication/authenticationStyles';
import { useTranslation } from 'react-i18next'

type Props = {
  changeScreen: (screen: string | void) => void;
};

const Login: React.FC<Props> = ({ changeScreen }) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={AuthenticationStyles.fieldWrapper}>
        <Text style={AuthenticationStyles.fieldLabel}>{t('username')}</Text>

        <TextInput></TextInput>
      </View>

      <Pressable style={AuthenticationStyles.buttonBack} onPress={e => { changeScreen() }}>
        <View>
          <Text style={AuthenticationStyles.buttonBackText}>Back</Text>
        </View>
      </Pressable>
    </>)
}

export default Login;