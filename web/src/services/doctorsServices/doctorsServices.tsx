import Api from "../../api/api";

const DoctorsServices = () => {
  const api = Api();

  const doctors = (page: number = 1) => {
    return api.post(`/doctors?page=${page}`, undefined, false);
  }

  const doctorsShow = (id: number) => {
    return api.post(`/doctors/view/${id}`, undefined, false);
  }

  return {
    doctors,
    doctorsShow,
  }
}

export default DoctorsServices;