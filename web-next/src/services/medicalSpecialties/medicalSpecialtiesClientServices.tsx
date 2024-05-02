import ClientSideApi from "../../api/clientApi";

const MedicalSpecialtiesClientServices = () => {
    const api = ClientSideApi();

    const medicalSpecialtiesList = () => {
        return api.get(`/medicalSpecialties`, undefined, false);
    }

    return {
        medicalSpecialtiesList,
    }
}

export default MedicalSpecialtiesClientServices;