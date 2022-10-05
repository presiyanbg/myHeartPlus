import { Colors } from "./colors";

/**
 * 
 * System styles
 * 
 * @returns {object}
 * 
 */
const Styles = () => {

  /**
   *  Styles for views -- Start
   */

  const WhiteBox = () => {
    return ({
      backgroundColor: Colors.white,
      padding: '5%',
      borderRadius: 25,
      ...DefaultShadow(),
    });
  }

  const DefaultShadow = () => {
    return ({
      shadowOffset: { width: 10, height: 10 },
      shadowColor: '#000',
      shadowOpacity: 1,
      elevation: 10,
    });
  }

  const customInputWrapper = () => {
    return ({
      shadowOffset: { width: 10, height: 10 },
      shadowColor: '#000',
      shadowOpacity: 1,
      elevation: 10,
      textAlign: 'center',
    });
  }

  /**
   *  Styles for views -- End
   */

  /////////////////////////////////////////////

  /**
   *  Styles for text -- Start
   */


  const H1 = () => {
    return ({
      fontSize: 30,
    });
  }

  const H2 = () => {
    return ({
      fontSize: 25,
    });
  }

  const H3 = () => {
    return ({
      fontSize: 20,
    });
  }

  const H4 = () => {
    return ({
      fontSize: 15,
    });
  }

  const H5 = () => {
    return ({
      fontSize: 10,
    });
  }

  /**
   *  Styles for text -- End
   */

  /**
   * Styles for buttons -- Start
   */

  const buttonCircle = () => {
    return ({
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 100,
    })
  }

  /**
   * Styles for buttons -- End
   */


  return {
    // Views
    DefaultShadow,
    WhiteBox,
    customInputWrapper,

    // Text
    H1,
    H2,
    H3,
    H4,
    H5,

    // Buttons
    buttonCircle
  }
}

export default Styles;
