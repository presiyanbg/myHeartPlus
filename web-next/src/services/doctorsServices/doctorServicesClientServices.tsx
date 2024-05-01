import ClientSideApi from "../../api/clientApi";

const DoctorServicesClientServices = () => {
    const api = ClientSideApi();

    const doctorShow = (doctor_id: number | string) => {
        return api.get(`/doctors/${doctor_id}`, undefined, false);
    }

    const doctorUpdate = (doctorId: number, params: {}) => {
        return api.post(`/doctors/${doctorId}/update`, params, true);
    }

    return {
        doctorShow,
        doctorUpdate,
    }
}

export default DoctorServicesClientServices;