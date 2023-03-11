
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

  /**
   * Load doctor profile
   * 
   * @param doctorId number ID of doctor record
   * @returns API response
   */
  const loadDoctor = async (doctorId: string | number) => {
    const data = await doctorsServices.doctorShow(doctorId);

    return data;
  }

  return {
    loadDoctors,
    loadDoctor,
  }
}

export default DoctorsLogic;