import DoctorsServices from "../../services/doctorsServices/doctorsServices";

const PrescriptionsLogic = () => {
  const doctorServices = DoctorsServices();

  /**'
   * Load doctor prescriptions
   * 
   * @param doctor_id ID of doctor
   * @returns API response
   */
  const loadDoctorPrescriptions = async (doctor_id: number) => {
    const data = await doctorServices.doctorShowPrescriptions(doctor_id);

    return data;
  }

  return {
    loadDoctorPrescriptions,
  }

}

export default PrescriptionsLogic;