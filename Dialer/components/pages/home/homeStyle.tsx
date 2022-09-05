import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  home: {
    backgroundColor: "#8D69D4",
    height: '100%',
  },
  homeView: {
    height: '80%',
  },
  mainButtons: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  mainButton: {
    width: '45%',
    height: 40,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  mainButtonText: {
    textAlign: 'center',
    color: '#8D69D4',
    textTransform: 'uppercase',
    fontSize: 15,
  }
});

export default HomeStyles;
