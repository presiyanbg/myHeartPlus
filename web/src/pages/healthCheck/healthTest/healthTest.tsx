
import React, { useEffect, useState } from 'react';
import PageTitle from "../../../components/common/pageTitle/pageTitle";

import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';
import HealthCheckLogic from '../healthCheckLogic';
import HealthTestView from '../../../components/healthTests/healthTestView/healthTestView';
import HealthTestResult from '../../../components/healthTests/healthTestResult/healthTestResult';

const HealthTest = () => {
  const [test, setTest] = useState<any>();
  const [testQA, setTestQA] = useState<any>();
  const [showResult, setShowResult] = useState<boolean>(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const logic = HealthCheckLogic();

  /**
   * Handle test results submit
   * 
   * @param data 
   */
  const handleTestSubmit = (data: any) => {
    console.log(data)
  }

  // Load test on init
  useEffect(() => {
    if (id) {
      // Load test basic data 
      logic.loadHeathTest(id).then(test => {
        setTest(test);

        // Load test questions and answers
        logic.loadHeathTestQA(id).then(qa => {
          setTestQA(qa);
          scrollToElement(`.${SELECTORS.anchorScroll}`);
        });
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
            { url: "/check", title: t('Health checks') }
          ]}></PageTitle>

        {/* Show test view */}
        {
          !showResult && <HealthTestView testQA={testQA.questions} submitTest={handleTestSubmit}></HealthTestView>
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