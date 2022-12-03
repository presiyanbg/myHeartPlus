import { useContext } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from "../../../context/userContext/userContextProvider";

const LogoutLogic = () => {
  const auth = AuthenticationServices();
  const { setUser, setIsAuth } = useContext(UserContext);

  const logout = () => {
    // Delete variables 
    setUser(false);
    setIsAuth(false);

    // Delete local storage items 
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // API Logout
    auth.logout();
  }

  return {
    logout,
  }
}

export default LogoutLogic;