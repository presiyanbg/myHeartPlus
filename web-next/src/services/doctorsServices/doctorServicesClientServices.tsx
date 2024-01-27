import ClientSideApi from "../../api/clientApi";

const DoctorServicesClientServices = () => {
    const api = ClientSideApi();

    const update = (doctorId: number, params: {}) => {
        return api.post(`/doctors/${doctorId}/update`, params, true);
    }

    return {
        update
    }
}

export default DoctorServicesClientServices;