
import { useContext, useEffect } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from "../../../context/userContext/userContextProvider";
import { useNavigate } from 'react-router-dom';

const LoginLogic = () => {
  const auth = AuthenticationServices();
  const navigate = useNavigate();
  const { authenticate } = useContext(UserContext);

  const login = async (params: {}) => {
    const data = await auth.login(params);

    if (data.token && data.user) {
      // Save data to provider
      authenticate(data.user, data.token)

      // Navigate to home page
      navigate('/home', { replace: true });
    }
  }

  return {
    login,
  }

}

export default LoginLogic;