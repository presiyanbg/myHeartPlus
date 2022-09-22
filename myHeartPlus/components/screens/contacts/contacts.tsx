import { useState } from "react";
import { SafeAreaView, View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import contactsStyle from './contactsStyle';

type ContactItem = {
  item: Contact
}

type Contact = {
  readonly id: number,
  readonly uuid: string,
  fullName: string,
  editMode: boolean,
  displayContactControlls: (id: number) => void
}

export type Props = {
  contacts: Contact[],
};

const ContactItem = ({ item }: ContactItem) => {
  return (
    <Pressable style={({ pressed }) => (!item.editMode && pressed && { ...contactsStyle.contact, ...contactsStyle.contactPressed }) || ({ ...contactsStyle.contact })}
      onLongPress={() => item.displayContactControlls(item.id)}>
      <Text style={contactsStyle.contactFullName}>
        {item.fullName}
      </Text>
      {
        item.editMode &&
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
      }
    </Pressable >
  )
};

const Contacts: React.FC<Props> = ({
  contacts = Props.contacts
}) => {
  const [contactsArray, setContactsArray] = useState<Contact[]>(contacts);

  const displayContactControlls = (id: number) => {
    setContactsArray(contactsArray => [...contactsArray.map(contact => {
      contact.editMode = false;

      if (contact.id === id) {
        contact.editMode = true;
      }

      return contact;
    })]);
  }

  const renderItem = ({ item }: ContactItem) => {
    item.displayContactControlls = displayContactControlls;
    return (
      <ContactItem item={item} />
    )
  };

  return (
    <View style={contactsStyle.contactsContainer}>
      <FlatList
        alwaysBounceVertical={true}
        data={contactsArray}
        renderItem={renderItem}
        keyExtractor={(item: Contact) => item.uuid}
      />
    </View>
  );
}

export default Contacts;