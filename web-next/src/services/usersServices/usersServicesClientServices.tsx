import ClientSideApi from "../../api/clientApi";

const UsersServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (userId: number, params: {}) => {
        return api.post(`/users/${userId}/update`, params, true);
    }

    const updateHealthDetails = (userId: number, params: {}) => {
        return api.post(`/users/${userId}/update/health`, params, true);
    }

    const roles = () => {
        return api.get(`/users/roles`, undefined, false);
    }

    const getRole = (token: string) => {
        return api.post(`/users/get-role`, { token }, false, true);
    }

    const getUserMedicalProfiles = (userId: number) => {
        return api.get(`/users/${userId}/medical-profiles`, undefined, true);
    }

    return {
        update,
        updateHealthDetails,
        roles,
        getRole,
        getUserMedicalProfiles,
    }
}

export default UsersServicesClientServices;