import { useContext } from 'react';
import AuthenticationServices from "../../../services/authServices/authServices";
import { UserContext } from '../../../context/userContext/userContextProvider';
import { useNavigate } from 'react-router-dom';

const RegistrationLogic = () => {
  const auth = AuthenticationServices();
  const navigate = useNavigate();
  const { authenticate } = useContext(UserContext);

  const register = async (params: {}) => {
    const data = await auth.register(params);

    if (data.token && data.user) {
      // Save data to provider
      authenticate(data.user, data.token)

      // Navigate to home page
      navigate('/home');
    }
  }

  return {
    register
  }
}

export default RegistrationLogic;