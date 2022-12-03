import { useContext } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from '../../../context/userContext/userContextProvider';

const RegistrationLogic = () => {
  const auth = AuthenticationServices();
  const { setUser, setIsAuth } = useContext(UserContext);

  const register = async (params: {}) => {
    const data = await auth.register(params);

    if (data.token && data.user) {
      // Save data to local storage 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Save data to provider
      setUser(data.user);
      setIsAuth(true);
    }
  }

  return {
    register
  }
}

export default RegistrationLogic;