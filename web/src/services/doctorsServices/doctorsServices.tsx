import Api from "../../api/api";

const DoctorsServices = () => {
  const api = Api();

  const doctors = (page: number = 1) => {
    return api.post(`/doctors?page=${page}`, undefined, false);
  }

  const doctorShow = (id: number | string) => {
    return api.post(`/doctors/${id}`, undefined, false);
  }

  return {
    doctors,
    doctorShow,
  }
}

export default DoctorsServices;