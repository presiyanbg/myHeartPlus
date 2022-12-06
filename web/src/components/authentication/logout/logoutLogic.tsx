import { useContext } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from "../../../context/userContext/userContextProvider";

const LogoutLogic = () => {
  const auth = AuthenticationServices();
  const { renounce } = useContext(UserContext);

  const logout = () => {
    // API Logout
    auth.logout().then(() => {

      // Context Logout 
      renounce();
    });
  }

  return {
    logout,
  }
}

export default LogoutLogic;