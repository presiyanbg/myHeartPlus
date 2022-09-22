
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView, Platform, NativeModules, StyleProp, Text, Pressable, Image } from 'react-native';
import DynamicStatusBarStyles from './dynamicStatusBarStyles';
import logo from '../../assets/images/logo.png'

const DynamicStatusBar: React.FC<Props> = ({ }) => {
  /**
   * Status bar dymanic styles.
   * 
   * Change height based on device.
   * 
   */
  const { StatusBarManager } = NativeModules;
  const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const statusBarWrapperStyle = StyleSheet.create({
    statusbar: {
      height: statusBarHeight,
    }
  });

  return (
    <Pressable style={DynamicStatusBarStyles.viewWrapper}>
      <SafeAreaView style={statusBarWrapperStyle}>
        <StatusBar style="dark" hidden={false} animated={true}></StatusBar>
      </SafeAreaView>
      <View style={DynamicStatusBarStyles.mainView}>
        <Image source={logo} style={DynamicStatusBarStyles.logo}></Image>
      </View>
    </Pressable>
  );
}

export default DynamicStatusBar