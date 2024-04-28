import ClientSideApi from "../../api/clientApi";

const UsersServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (userId: number, params: {}) => {
        return api.post(`/users/${userId}/update`, params, true);
    }

    return {
        update
    }
}

export default UsersServicesClientServices;