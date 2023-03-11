import MedicamentsLogic from "../medicamentsLogic";
import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import MedicamentView from "../../../components/medicamentComponents/medicamentView/medicamentView";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';

const Medicament = () => {
  const [medicament, setPrescription] = useState<any>();

  const logic = MedicamentsLogic();

  const { id } = useParams();
  const { t } = useTranslation();

  // Load test on init
  useEffect(() => {
    if (!id) return;

    // Load test basic data 
    logic.loadMedicament(id).then(response => {
      setPrescription(response.medicament);
      scrollToElement(`.${SELECTORS.anchorScroll}`);
    });
  }, [id]);

  if (!id || !medicament) return (<></>);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={medicament.title}
          breadCrumbs={[
            { url: "/medicaments", title: t('Medicaments') }
          ]}></PageTitle>

        <div className="page--content">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <MedicamentView medicament={medicament}></MedicamentView>
            </div>

            <div className="col-sm-12 col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Medicament;