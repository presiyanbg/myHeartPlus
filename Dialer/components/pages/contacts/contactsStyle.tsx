import { StyleSheet } from 'react-native';

const contactsStyle = StyleSheet.create({
  contactsContainer: {
    padding: '5%',
  },
  contact: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contactFullName: {
    flex: 2,
    padding: 10,
    color: '#000',
  },
  contactControlls: {
    flex: 2,
    flexDirection: 'row',
  },
  contactControl: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  contactCall: {
    backgroundColor: '#52FF8E',
  },
  contactEdit: {
    backgroundColor: '#E9FF5C',
  },
  contactDelete: {
    backgroundColor: '#FD6A6A',
  },
});

export default contactsStyle;
