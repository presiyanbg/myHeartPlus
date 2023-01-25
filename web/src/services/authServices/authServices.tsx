
import Api from "../../api/api";

const AuthenticationServices = () => {
  const api = Api();

  const login = (params: {}) => {
    return api.post('/users/login', params, true, true, false);
  }

  const logout = () => {
    return api.post('/users/logout', true, true, false);
  }

  const register = (params: {}) => {
    return api.post('/users/register', params, true, true, false, true);
  }

  return {
    login,
    logout,
    register
  }

}

export default AuthenticationServices;