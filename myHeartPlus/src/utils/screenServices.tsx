import { Dimensions } from 'react-native';

const ScreenServices = () => {

  const CalculateHeight = (percentHeight: number): number => {
    const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0));

    if (!windowHeight || windowHeight < 0) {
      return 0;
    }

    return parseInt(((windowHeight * percentHeight) / 100).toFixed(0));
  }

  const CalculateWidth = (percentHeight: number): number => {
    const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0));

    if (!windowWidth || windowWidth < 0) {
      return 0;
    }

    return parseInt(((windowWidth * percentHeight) / 100).toFixed(0));
  }


  return {
    CalculateHeight,
    CalculateWidth,
  }

}

export default ScreenServices;