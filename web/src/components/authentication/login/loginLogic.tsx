
import { useContext, useEffect } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from "../../../context/userContext/userContextProvider";

const LoginLogic = () => {
  const auth = AuthenticationServices();
  const { setUser, setIsAuth } = useContext(UserContext);

  const login = async (params: {}) => {
    const data = await auth.login(params);

    if (data.token && data.user) {
      // Save data to local storage 
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Save data to provider
      setUser(data.user);
      setIsAuth(true);
    }
  }

  return {
    login,
  }

}

export default LoginLogic;