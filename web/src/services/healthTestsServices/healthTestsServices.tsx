import Api from "../../api/api";

const HealthTestsServices = () => {
  const api = Api();

  const healthTests = (page: number = 1) => {
    return api.post(`/health-tests?page=${page}`, undefined, false);
  }

  const healthTestShow = (id: number | string) => {
    return api.post(`/health-tests/view/${id}`, undefined, false);
  }

  return {
    healthTests,
    healthTestShow,
  }
}

export default HealthTestsServices;