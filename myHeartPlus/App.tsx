import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet} from 'react-native';
import Home from './components/pages/home/home';

const App: React.FC = ({
}) => {
  return (
    <>
      <View style={styles.statusbar}>
        <StatusBar style="light"></StatusBar>
      </View>
      <View>
        <Home appName="Phone Dialer" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: '#9277FF',
    width: '100%',
    height: '4%'
  }
});

export default App;



