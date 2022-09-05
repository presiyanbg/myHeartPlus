import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Navigation from '../navigation/navigation';
import Contacts from '../contacts/contacts';
import HomeStyles from './homeStyle';

export type Props = {
  appName: string;
  navVisible: boolean;
}

const Home: React.FC<Props> = ({
  appName = 'Ananas',
  navVisible = false,
}) => {
  const [navigationVisible, setNavigationVisible] = useState(navVisible);

  return (
    <View>
      <View>
        {navigationVisible && <Navigation userLevel={1} />}
      </View>
      <View style={HomeStyles.home}>
        <View style={HomeStyles.homeView}>
          <Contacts />
        </View>
        <View style={HomeStyles.mainButtons}>
          <Pressable style={HomeStyles.mainButton}>
            <Text style={HomeStyles.mainButtonText}>Call</Text>
          </Pressable>
          <Pressable style={HomeStyles.mainButton}>
            <Text style={HomeStyles.mainButtonText}>Text</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


export default Home;