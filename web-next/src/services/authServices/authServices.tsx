
import ClientSideApi from "../../api/clientApi";

const AuthenticationServices = () => {
    const api = ClientSideApi();

    const login = (params: {}) => {
        return api.post('/users/login', params, false, true);
    }

    const logout = () => {
        return api.post('/users/logout', false, true);
    }

    const register = (params: {}) => {
        return api.post('/users/register', params, true, true);
    }

    return {
        login,
        logout,
        register
    }

}

export default AuthenticationServices;