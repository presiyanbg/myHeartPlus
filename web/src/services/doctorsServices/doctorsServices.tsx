import Api from "../../api/api";

const DoctorsServices = () => {
  const api = Api();

  const doctors = (page: number = 1) => {
    return api.post(`/doctors?page=${page}`, undefined, false);
  }

  const doctorShow = (doctor_id: number | string) => {
    return api.post(`/doctors/view/${doctor_id}`, undefined, false);
  }

  const doctorShowHealthTests = (doctor_id: number | string) => {
    return api.post(`/doctors/${doctor_id}/health-tests/`, undefined, false);
  }

  const doctorShowPrescriptions = (doctor_id: number | string) => {
    return api.post(`/doctors/${doctor_id}/prescriptions/`, undefined, false);
  }

  const doctorShowPatients = (doctor_id: number | string) => {
    return api.post(`/doctors/${doctor_id}/showPatients/`, undefined, false);
  }

  return {
    doctors,
    doctorShow,
    doctorShowHealthTests,
    doctorShowPrescriptions,
    doctorShowPatients,
  }
}

export default DoctorsServices;