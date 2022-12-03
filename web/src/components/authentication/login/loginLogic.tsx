
import { useContext, useEffect } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from "../../../context/userContext/userContextProvider";

const LoginLogic = () => {
  const auth = AuthenticationServices();
  const { setUser, setIsAuth } = useContext(UserContext);

  const login = async (params: {}) => {
    const data = await auth.login(params);

    if (data.token && data.user) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuth(true);
    }
  }

  // Check user session
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (user?.first_name && token?.length) {
      setUser(user);
      setIsAuth(true);
    }

  }, []);

  return {
    login,
  }

}

export default LoginLogic;