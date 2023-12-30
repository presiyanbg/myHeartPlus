import ClientSideApi from "../../api/clientApi";

const DoctorServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (userId: number, params: {}) => {
        return api.post(`/doctors/update/${userId}`, params, true);
    }

    return {
        update
    }
}

export default DoctorServicesClientServices;