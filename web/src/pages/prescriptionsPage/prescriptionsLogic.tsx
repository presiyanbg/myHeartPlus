import PrescriptionsServices from "../../services/prescriptionsServices/prescriptionsServices";

const PrescriptionsLogic = () => {
  const prescriptionServices = PrescriptionsServices();

  /**
   * Load prescription 
   * 
   * @returns API response
   */
  const loadPrescriptions = async () => {
    const data = await prescriptionServices.prescriptions();

    return data;
  }

  /**
 * Load prescription 
 * 
 * @param prescription_id ID of prescription
 * @returns API response
 */
  const loadPrescription = async (prescription_id: number | string) => {
    const data = await prescriptionServices.prescriptionShow(prescription_id);

    return data;
  }


  return {
    loadPrescriptions,
    loadPrescription,
  }

}

export default PrescriptionsLogic;