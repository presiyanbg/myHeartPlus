import AuthenticationServices from "../../../services/authServices/authServices";

const RegistrationLogic = () => {
  const auth = AuthenticationServices();

  const register = async (params: {}) => {
    const data = await auth.register(params);

    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  return {
    register
  }
}

export default RegistrationLogic;