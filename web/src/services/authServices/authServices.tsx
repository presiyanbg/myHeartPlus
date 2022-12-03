
import Api from "../../api/api";

const AuthenticationServices = () => {
  const api = Api();

  const login = (params: {}) => {
    return api.post('/users/login', params);
  }

  const logout = () => {
    return api.post('/users/logout');
  }

  const register = (params: {}) => {
    return api.post('/users/register', params);
  }

  return {
    login,
    logout,
    register
  }

}

export default AuthenticationServices;