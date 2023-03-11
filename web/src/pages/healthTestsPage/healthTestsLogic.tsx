import HealthTestsServices from "../../services/healthTestsServices/healthTestsServices";

import { useContext } from "react";
import { HealthTestQuestionsType, HealthTestSubmitParamsType } from "../../ts/types";
import { UserContext } from "../../context/userContext/userContextProvider";

const HealthTestsLogic = () => {
  const healthTestsServices = HealthTestsServices();
  const { user } = useContext(UserContext);

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

  const saveHealthTestResult = async (test_id: number | string, result: number, questions_and_answers: HealthTestQuestionsType) => {
    let params: HealthTestSubmitParamsType = {
      user_id: undefined,
      test_id,
      result,
      questions_and_answers
    }

    // Save test result to user profile 
    if (user && user?.id > 0) {
      params.user_id = user.id;
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