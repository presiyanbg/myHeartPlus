
import React, { useEffect, useState } from 'react';
import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import HealthTestsLogic from '../healthTestsLogic';
import HealthTestView from '../../../components/healthTestComponents/healthTestView/healthTestView';
import HealthTestResult from '../../../components/healthTestComponents/healthTestResult/healthTestResult';

import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';
import { HealthTestQuestionsType, HealthTestType } from '../../../ts/types';

const HealthTest = () => {
  const [test, setTest] = useState<HealthTestType>();
  const [testQA, setTestQA] = useState<HealthTestQuestionsType>();
  const [result, setResult] = useState<any>();
  const [showResult, setShowResult] = useState<boolean>(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const logic = HealthTestsLogic();

  /**
   * Handle test results submit
   * 
   * @param data 
   */
  const handleTestSubmit = (result: number, questions_and_answers: any[]) => {
    logic.saveHealthTestResult(result, questions_and_answers).then((response: any) => {
      setResult(response);
      setShowResult(true);
    });
  }

  // Load test on init
  useEffect(() => {
    if (id) {
      // Load test basic data 
      logic.loadHeathTest(id).then(response => {
        setTest(response.test);
        setTestQA(response.testQA);

        scrollToElement(`.${SELECTORS.anchorScroll}`);
      });
    }
  }, [id]);

  // Return 404 
  if (!test || !id || !testQA) {
    return (<></>);
  }

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={test.title}
          breadCrumbs={[
            { url: "/health-tests", title: t('Health checks') }
          ]}></PageTitle>

        {/* Show test view */}
        {
          !showResult && <HealthTestView testID={id} testQA={testQA} submitTest={handleTestSubmit}></HealthTestView>
        }

        {/* Show test result */}
        {
          showResult && <HealthTestResult></HealthTestResult>
        }
      </div>
    </div>
  )
}

export default HealthTest;