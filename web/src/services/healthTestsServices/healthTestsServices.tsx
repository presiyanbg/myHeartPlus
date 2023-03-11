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

  const healthTestPatientResults = (id: number | string) => {
    return api.post(`/health-tests/results/${id}`, {}, false, true, false);
  }

  return {
    healthTests,
    healthTestShow,
    healthTestSubmitResult,
    healthTestPatientResults,
  }
}

export default HealthTestsServices;