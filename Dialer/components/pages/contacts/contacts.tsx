import { useState } from "react";
import { SafeAreaView, View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import contactsStyle from './contactsStyle';

const Data = [
  {
    id: 1,
    fullName: 'Ivan Ivanov',
  },
  {
    id: 2,
    fullName: 'Ivan Ivanov',
  },
  {
    id: 3,
    fullName: 'Ivan Ivanov',
  },
  {
    id: 4,
    fullName: 'Ivan Ivanov',
  },
];

export type Props = {
  contacts: {
    id: number
    fullName: string,
  }[],
  onPress(): void
};

interface ContactInterface {
  item: {
    id: number
    fullName: string,
  },
  onLongPress: (event: GestureResponderEvent) => void
}

const ContactItem = ({ item }: ContactInterface, handleLongPress: ContactInterface,) => (
  <Pressable style={contactsStyle.contact} onPress={(item) => console.log(item)}>
    <Text style={contactsStyle.contactFullName}>
      {item.fullName}
    </Text>
    <View style={contactsStyle.contactControlls}>
      <View style={{ ...contactsStyle.contactControl, ...contactsStyle.contactCall }}>
        <Text>1</Text>
      </View>
      <View style={{ ...contactsStyle.contactControl, ...contactsStyle.contactEdit }}>
        <Text>2</Text>
      </View>
      <View style={{ ...contactsStyle.contactControl, ...contactsStyle.contactDelete }}>
        <Text>3</Text>
      </View>
    </View>
  </Pressable >
);

const Contacts: React.FC<Props> = ({
  contacts = Data
}) => {
  const [contactsArray, setContactsArray] = useState(contacts);

  const displayContactControlls = ({ item }: ContactInterface) => {
    console.log(item)
  }

  const renderItem = ({ item }: ContactInterface) => (
    <ContactItem item={item} handleLongPress={displayContactControlls} />
  );

  return (
    <View style={contactsStyle.contactsContainer}>
      <FlatList
        alwaysBounceVertical={true}
        data={contactsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Contacts;