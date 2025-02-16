import Api from "../../api/api";

const PrescriptionsServices = () => {
  const api = Api();

  const prescriptions = (page: number = 1) => {
    return api.post(`/prescriptions?page=${page}`, undefined, false);
  }

  const prescriptionShow = (id: number | string) => {
    return api.post(`/prescriptions/view/${id}`, undefined, false);
  }

  return {
    prescriptions,
    prescriptionShow
  }
}

export default PrescriptionsServices;