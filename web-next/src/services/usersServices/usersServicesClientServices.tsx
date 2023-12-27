import ClientSideApi from "../../api/clientApi";

const UsersServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (userId: number, params: {}) => {
        return api.post(`/users/update/${userId}`, params, true);
    }

    return {
        update
    }
}

export default UsersServicesClientServices;