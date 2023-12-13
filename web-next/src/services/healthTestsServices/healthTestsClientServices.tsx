import ClientSideApi from "@/api/clientApi";

const HealthTestsClientServices = () => {
    const api = ClientSideApi();

    const healthTestSubmitResult = (params: any) => {
        return api.post(`/health-tests/submit-result`, params, true);
    }

    return {
        healthTestSubmitResult
    }
}

export default HealthTestsClientServices;