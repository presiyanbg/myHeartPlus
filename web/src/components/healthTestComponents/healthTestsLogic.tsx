import DoctorsServices from "../../services/doctorsServices/doctorsServices";

const HealthTestsLogic = () => {
  const doctorServices = DoctorsServices();

  /**
   * Load test specific to doctor
   * 
   * @param doctor_id ID of doctor
   * @returns API response
   */
  const loadDoctorTestsPreview = async (doctor_id: number) => {
    const data = await doctorServices.doctorShowHealthTests(doctor_id);

    return data;
  }

  return {
    loadDoctorTestsPreview,
  }
}

export default HealthTestsLogic;