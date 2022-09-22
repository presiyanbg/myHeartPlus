import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import Styles from '../../styles/styles';
import ScreenServices from '../../utils/screenServices';

const style = Styles();
const screen = ScreenServices();

const AuthenticationStyles = StyleSheet.create({
  mainView: {
    height: screen.CalculateHeight(40),
    marginTop: screen.CalculateHeight(5),
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  button: {
    width: '100%',
    ...style.WhiteBox(),
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    ...style.H4(),
  },
  socialMediaWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialMediaButton: {
    width: '30%',
    alignItems: 'center',
    ...style.WhiteBox(),
    padding: '1%',
  },
  socialMediaIcon: {
    resizeMode: 'contain',
    height: screen.CalculateHeight(5),
    width: screen.CalculateHeight(5),
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: Colors.darkGray,
    ...style.H4(),
  }
});

export default AuthenticationStyles;