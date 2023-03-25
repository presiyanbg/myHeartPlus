
import Api from "../../api/api";

const CommonServices = () => {
  const api = Api();

  const healthCategoryShow = (id: number | string) => {
    return api.post(`/health-category/view/${id}`, undefined, false);
  }

  return {
    healthCategoryShow,
  }
}

export default CommonServices;