import Api from "../../api/api";

const MedicamentsServices = () => {
  const api = Api();

  const medicaments = (page: number = 1) => {
    return api.post(`/medicaments?page=${page}`, undefined, false);
  }

  const medicamentShow = (id: number | string) => {
    return api.post(`/medicaments/view/${id}`, undefined, false);
  }

  return {
    medicaments,
    medicamentShow
  }
}

export default MedicamentsServices;