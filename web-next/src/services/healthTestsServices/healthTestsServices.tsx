import ServerSideApi from "../../api/serverApi";

const HealthTestsServices = () => {
    const api = ServerSideApi();

    const healthTestsList = (page: number = 1) => {
        return api.post(`/health-tests?page=${page}`, undefined, false);
    }

    const healthTestShow = (id: number | string) => {
        return api.post(`/health-tests/view/${id}`, undefined, false);
    }

    const healthTestPatientResults = (patient_id: number | string) => {
        return api.post(`/health-results/${patient_id}`, undefined, false);
    }

    const healthTestResultShow = (id: number | string) => {
        return api.post(`/health-results/view/${id}`, undefined, false);
    }

    return {
        healthTestsList,
        healthTestShow,
        healthTestPatientResults,
        healthTestResultShow,
    }
}

export default HealthTestsServices;