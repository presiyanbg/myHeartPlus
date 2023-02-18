import { DoctorType } from "../../ts/types";
import { buildAddress } from "../../utils/utils";

const DoctorLogic = () => {

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

  return {
    buildDoctorAddress,
  }

}

export default DoctorLogic;