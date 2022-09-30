import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Navigation from '../../navigation/navigation';
import Contacts from '../contacts/contacts';
import HomeStyles from './homeStyle';

export type Props = {
  appName: string;
  navVisible: boolean;
}

const Home: React.FC<Props> = ({
  appName = 'myHeart+',
  navVisible = false,
}) => {
  const [navigationVisible, setNavigationVisible] = useState(navVisible);

  return (
    <View>
      <View>
        {navigationVisible && <Navigation userLevel={1} />}
      </View>
      <View style={HomeStyles.home}>
        <Text> Home Page </Text>
      </View>
    </View>
  );
}

export default Home;