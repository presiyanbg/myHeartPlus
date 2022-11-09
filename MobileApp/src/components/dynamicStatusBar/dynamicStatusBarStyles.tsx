import { StyleSheet } from 'react-native';
import ScreenServices from '../../utils/screenServices';
import Styles from '../../styles/styles';

const screen = ScreenServices();
const styles = Styles();

const DynamicStatusBarStyles = StyleSheet.create({
  viewWrapper: {
    zIndex: 100,
    backgroundColor: 'transparent',
    height: screen.CalculateHeight(40),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
    ...styles.DefaultShadow(),
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  logo: {
    resizeMode: 'contain',
    height: screen.CalculateHeight(30),
    width: screen.CalculateHeight(30),
    flex: 1,
  }
});

export default DynamicStatusBarStyles;
