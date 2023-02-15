
import DoctorsServices from "../../services/doctorsServices/doctorsServices";

const DoctorsLogic = () => {
  const doctorsServices = DoctorsServices();

  const loadDoctors = async () => {
    const data = await doctorsServices.doctors();

    return data;
  }

  return {
    loadDoctors,
  }
}

export default DoctorsLogic;