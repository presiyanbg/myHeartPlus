import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';

import PrescriptionsLogic from "../prescriptionsLogic";
import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import PrescriptionView from "../../../components/prescriptionComponents/prescriptionView/prescriptionView";

const Prescription = () => {
  const [prescription, setPrescription] = useState<any>();

  const { id } = useParams();
  const { t } = useTranslation();

  const logic = PrescriptionsLogic();

  // Load test on init
  useEffect(() => {
    if (id) {
      // Load test basic data 
      logic.loadPrescription(id).then(response => {
        setPrescription(response.prescription);

        scrollToElement(`.${SELECTORS.anchorScroll}`);
      });
    }
  }, [id]);

  if (!id || !prescription) return (<></>);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={prescription.title}
          breadCrumbs={[
            { url: "/prescriptions", title: t('Тreatments') }
          ]}></PageTitle>

        <div className="page--content">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <PrescriptionView prescription={prescription}></PrescriptionView>
            </div>

            <div className="col-sm-12 col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prescription;