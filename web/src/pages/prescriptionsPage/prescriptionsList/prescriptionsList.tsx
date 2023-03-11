import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import PrescriptionsLogic from "../prescriptionsLogic";
import CustomPagination from "../../../components/paginationComponents/customPagination";
import PrescriptionsTable from "../../../components/prescriptionComponents/prescriptionsTable/prescriptionsTable";

import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';
import { useState, useEffect } from "react";
import { PaginationType } from "../../../ts/types";

const PrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState<any>([]);
  const [pagination, setPagination] = useState<PaginationType>();

  const { t } = useTranslation();

  const logic = PrescriptionsLogic();

  /**
   * Save loaded data 
   * 
   * @param data API paginated response
   */
  const onDataLoad = (data: any) => {
    if (!data?.prescriptions?.data) return;

    setPrescriptions(data.prescriptions.data);
    setPagination(data.prescriptions);
    scrollToElement(`.${SELECTORS.anchorScroll}`);
  }

  /**
   * Load doctor records on init
   */
  useEffect(() => {
    if (!prescriptions.length) {
      logic.loadPrescriptions().then((response: any) => {
        onDataLoad(response);
      });
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={t('Тreatments')}></PageTitle>

        <div className="page--content">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <PrescriptionsTable prescriptions={prescriptions}></PrescriptionsTable>

              <div className="mb-5"></div>

              <CustomPagination url='prescriptions' pagination={pagination} onDataLoad={onDataLoad}></CustomPagination>
            </div>

            <div className="col-sm-12 col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionsList;