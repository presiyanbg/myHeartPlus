import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import HealthTestsLogic from "../healthTestsLogic";
import HealthTestResultView from "../../../components/healthTestComponents/healthTestResultView/healthTestResultView";

import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from "react";
import { SELECTORS } from "../../../constants/selectors";
import { HealthTestAdviceType, HealthTestType } from "../../../ts/types";
import { UserContext } from "../../../context/userContext/userContextProvider";

const HealthTestResult = () => {
  const [result, setResult] = useState<any>();
  const [test, setTest] = useState<HealthTestType | any>();
  const [advice, setAdvice] = useState<HealthTestAdviceType | any>();

  const { id } = useParams();
  const { t } = useTranslation();
  const { isAuth } = useContext(UserContext);

  const logic = HealthTestsLogic();

  useEffect(() => {
    if (!id || !isAuth || test) return;

    logic.loadHealthTestResult(id).then(response => {
      if (!response?.result?.test || !response?.result?.advice) return;

      setResult(response.result);
      setTest(response.result.test);
      setAdvice(response.result.advice);

      console.log(response)
    });

  }, [id, isAuth]);

  if (!id || !result || !advice || !test) return (<></>);

  return (
    <div className="wrapper">
      <div className="page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle
          breadCrumbs={[
            { url: "/users/profile", title: t('Profile page') }
          ]}
          title={test?.title}></PageTitle>

        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="row">
              <div className="col-12">
                <h3>{test?.title}</h3>
              </div>

              <div className="col-12">
                <p>{test?.description}</p>
              </div>
            </div>

            <div className="row mb-2 mt-2">
              <div className="col-12">
                <hr />
              </div>
            </div>

            {
              !!advice && (
                <div className="row">
                  <div className="col-12">
                    <HealthTestResultView advice={advice}></HealthTestResultView>
                  </div>
                </div>
              )
            }

          </div>

          <div className="col-sm-12 col-md-4">
            Doctor preview
          </div>
        </div>
      </div>
    </div>
  )

}

export default HealthTestResult;