import HealthTestsServices from "../../services/healthTestsServices/healthTestsServices";
import { HealthTestQuestionsType } from "../../ts/types";

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

  const saveHealthTestResult = async (result: number, questions_and_answers: HealthTestQuestionsType) => {
    const params = {
      result,
      questions_and_answers
    }

    const data = await healthTestsServices.healthTestSubmitResult(params);

    return data;
  }

  return {
    loadHeathTest,
    loadHeathTestList,
    saveHealthTestResult,
  }

}

export default HealthTestsLogic;