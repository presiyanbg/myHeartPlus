import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import AuthenticationStyles from './authenticationStyles';
import googleIcon from '../../assets/images/googleIcon.png';
import facebookIcon from '../../assets/images/facebookLogo.png';
import appleIcon from '../../assets/images/appleLogo.png';
import { useTranslation } from 'react-i18next'

const Authentication: React.FC<Props> = ({ }) => {
  const { t } = useTranslation();

  return (
    <View style={AuthenticationStyles.mainView}>
      <Pressable style={AuthenticationStyles.button}>
        <View>
          <Text style={AuthenticationStyles.buttonText}>{t('login')}</Text>
        </View>
      </Pressable>

      <Pressable style={AuthenticationStyles.button}>
        <View>
          <Text style={AuthenticationStyles.buttonText}>{t('register')}</Text>
        </View>
      </Pressable>

      <Pressable style={AuthenticationStyles.buttonWithIcon}>
        <View>
          <Image style={AuthenticationStyles.buttonIcon} source={googleIcon}></Image>
        </View>
      </Pressable>

      {/* <View style={AuthenticationStyles.socialMediaWrapper}>
        <Pressable style={AuthenticationStyles.socialMediaButton}>
          <View>
            <Image style={AuthenticationStyles.socialMediaIcon} source={googleIcon}></Image>
          </View>
        </Pressable>

        <Pressable style={AuthenticationStyles.socialMediaButton}>
          <View>
            <Image style={AuthenticationStyles.socialMediaIcon} source={facebookIcon}></Image>
          </View>
        </Pressable>

        <Pressable style={AuthenticationStyles.socialMediaButton}>
          <View>
            <Image style={AuthenticationStyles.socialMediaIcon} source={appleIcon}></Image>
          </View>
        </Pressable>
      </View> */}

      <Pressable>
        <Text style={AuthenticationStyles.forgotPasswordText}>Forgot password ?</Text>
      </Pressable>
    </View>
  );
}

export default Authentication;