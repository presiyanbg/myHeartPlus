
import Api from "../../api/api";

const AuthenticationServices = () => {
  const api = Api();

  const login = (params: {}) => {
    return api.post('/users/login', params);
  }

  const register = (params: {}) => {
    return api.post('/users/register', params);
  }

  return {
    login,
    register
  }

}

export default AuthenticationServices;