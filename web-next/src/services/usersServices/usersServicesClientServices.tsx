import ClientSideApi from "../../api/clientApi";

const UsersServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (userId: number, params: {}) => {
        return api.post(`/users/${userId}/update`, params, true);
    }

    const roles = () => {
        return api.get(`/users/roles`, undefined, false);
    }

    const getRole = (token: string) => {
        return api.post(`/users/get-role`, { token }, false);
    }

    return {
        update,
        roles,
        getRole,
    }
}

export default UsersServicesClientServices;