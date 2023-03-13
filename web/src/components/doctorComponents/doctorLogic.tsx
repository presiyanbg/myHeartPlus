import DoctorsServices from "../../services/doctorsServices/doctorsServices";
import { DoctorType } from "../../ts/types";
import { buildAddress } from "../../utils/utils";

const DoctorLogic = () => {

  const doctorsServices = DoctorsServices();

  /**
   * Build address for 
   * 
   * @param doctor DoctorType
   */
  const buildDoctorAddress = (doctor: DoctorType) => {
    return buildAddress([
      doctor.address_1,
      doctor.address_2,
      doctor.address_3,
      doctor.address_4,
      doctor.address_5,
    ]);
  }

  const loadDoctorPatients = async (doctor_id: number | string) => {
    const data = await doctorsServices.doctorShowPatients(doctor_id);

    return data;
  }

  return {
    buildDoctorAddress,
    loadDoctorPatients,
  }

}

export default DoctorLogic;