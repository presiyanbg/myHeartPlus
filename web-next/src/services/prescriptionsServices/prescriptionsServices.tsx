import ServerSideApi from "../../api/serverApi";

const PrescriptionsServices = () => {
    const api = ServerSideApi();

    const prescriptionsList = (page: number = 1) => {
        return api.get(`/prescriptions?page=${page}`, undefined, false);
    }

    const prescriptionShow = (id: number | string) => {
        return api.get(`/prescriptions/view/${id}`, undefined, false);
    }

    return {
        prescriptionsList,
        prescriptionShow
    }
}

export default PrescriptionsServices;