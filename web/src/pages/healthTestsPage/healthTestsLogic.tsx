import HealthTestsServices from "../../services/healthTestsServices/healthTestsServices";

const HealthTestsLogic = () => {
  const healthTestsServices = HealthTestsServices();

  /**
   * Load health test
   * 
   * @param test_id ID of test
   * @returns API response
   */
  const loadHeathTest = async (test_id: number | string) => {
    const data = await healthTestsServices.healthTestShow(test_id);

    return data;
  }

  const loadHeathTestList = async () => {
    const data = await healthTestsServices.healthTests();

    return data;
  }

  const saveResult = (data: any) => {

  }

  return {
    saveResult,
    loadHeathTest,
    loadHeathTestList,
  }

}

export default HealthTestsLogic;