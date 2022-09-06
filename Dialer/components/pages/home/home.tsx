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
          <Contacts contacts={Data} />
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

const Data = [
  {
    id: 1,
    uuid: '1223123123',
    fullName: 'Ivan Ivanov',
    editMode: false,
  },
  {
    id: 2,
    uuid: 'asdas1eas',
    fullName: 'Ivan Ivanov',
    editMode: false,
  },
  {
    id: 3,
    uuid: ';pojoerf',
    fullName: 'Ivan Ivanov',
    editMode: false,
  },
  {
    id: 4,
    uuid: ';1231as',
    fullName: 'Ivan Ivanov',
    editMode: false,
  },
];

export default Home;