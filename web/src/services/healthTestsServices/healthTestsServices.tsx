import Api from "../../api/api";

const HealthTestsServices = () => {
  const api = Api();

  const healthTests = (page: number = 1) => {
    return api.post(`/health-tests?page=${page}`, undefined, false);
  }

  const healthTestShow = (id: number | string) => {
    return api.post(`/health-tests/view/${id}`, undefined, false);
  }

  const healthTestSubmitResult = (params: any) => {
    return api.post(`/health-tests/submit-result`, params, false, true, false);
  }

  const healthTestPatientResults = (patient_id: number | string) => {
    return api.post(`/health-results/${patient_id}`, undefined, false, true, false);
  }

  const healthTestResultShow = (id: number | string) => {
    return api.post(`/health-results/view/${id}`, undefined, false);
  }

  return {
    healthTests,
    healthTestShow,
    healthTestSubmitResult,
    healthTestPatientResults,
    healthTestResultShow,
  }
}

export default HealthTestsServices;