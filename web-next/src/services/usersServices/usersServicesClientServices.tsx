import ClientSideApi from "../../api/clientApi";

const UsersServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (userId: number, params: {}) => {
        return api.post(`/users/${userId}/update`, params, true);
    }

    const roles = () => {
        return api.get(`/users/roles`, undefined, false);
    }

    return {
        update,
        roles,
    }
}

export default UsersServicesClientServices;