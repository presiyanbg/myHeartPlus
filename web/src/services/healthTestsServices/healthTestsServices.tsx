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
    return api.post(`/health-tests/submit-result/`, params, true, true, false, false);
  }

  return {
    healthTests,
    healthTestShow,
    healthTestSubmitResult,
  }
}

export default HealthTestsServices;