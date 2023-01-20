
import Api from "../../api/api";

const PaginationServices = () => {
  const api = Api();

  const load = (url: string) => {
    return api.post(url, undefined, false, false);
  }

  return {
    load,
  }
}

export default PaginationServices;