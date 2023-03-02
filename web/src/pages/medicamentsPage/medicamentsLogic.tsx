import MedicamentsServices from "../../services/medicamentsServices/medicamentsServices";

const MedicamentsLogic = () => {

  const medicamentsServices = MedicamentsServices();

  /**
   * Load medicaments 
   * 
   * @returns API response
   */
  const loadMedicaments = async () => {
    const data = await medicamentsServices.medicaments();

    return data;
  }


  /**
   * Load medicament 
   * 
   * @param medicament_id ID of medicament
   * @returns API response
   */
  const loadMedicament = async (medicament_id: number | string) => {
    const data = await medicamentsServices.medicamentShow(medicament_id);

    return data;
  }

  return {
    loadMedicaments,
    loadMedicament,
  }
}

export default MedicamentsLogic;