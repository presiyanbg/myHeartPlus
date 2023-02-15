
import DoctorsServices from "../../services/doctorsServices/doctorsServices";

const DoctorsLogic = () => {
  const doctorsServices = DoctorsServices();

  /**
   * Load all doctor records
   * 
   * @returns API paginated response 
   */
  const loadDoctors = async () => {
    const data = await doctorsServices.doctors();

    return data;
  }

  return {
    loadDoctors,
  }
}

export default DoctorsLogic;