
import AuthenticationServices from "../../../services/authServices/authServices";

const LoginLogic = () => {
  const auth = AuthenticationServices();

  const login = async (params: {}) => {
    const data = await auth.login(params);

    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  return {
    login,
  }

}

export default LoginLogic;