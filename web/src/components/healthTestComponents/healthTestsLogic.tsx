import DoctorsServices from "../../services/doctorsServices/doctorsServices";
import HealthTestsServices from "../../services/healthTestsServices/healthTestsServices";

const HealthTestsLogic = () => {
  const doctorServices = DoctorsServices();
  const healthTestsServices = HealthTestsServices();

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

  const loadPatientTestResults = async (patient_id: number | string) => {
    const data = await healthTestsServices.healthTestPatientResults(patient_id);

    return data;
  }

  return {
    loadDoctorTestsPreview,
    loadPatientTestResults,
  }
}

export default HealthTestsLogic;