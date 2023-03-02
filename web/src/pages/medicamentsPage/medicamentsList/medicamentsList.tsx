import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';
import { useState, useEffect } from "react";
import { PaginationType } from "../../../ts/types";

import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import CustomPagination from "../../../components/paginationComponents/customPagination";
import MedicamentsLogic from "../medicamentsLogic";
import MedicamentsTable from "../../../components/medicamentComponents/medicamentsTable/medicamentsTable";

const MedicamentsList = () => {
  const [medicaments, setMedicaments] = useState<any>([]);
  const [pagination, setPagination] = useState<PaginationType>();

  const { t } = useTranslation();

  const logic = MedicamentsLogic();

  /**
   * Save loaded data 
   * 
   * @param data API paginated response
   */
  const onDataLoad = (data: any) => {
    if (data?.medicaments?.data) {
      setMedicaments(data.medicaments.data);
      setPagination(data.medicaments);
      scrollToElement(`.${SELECTORS.anchorScroll}`);
    }
  }

  /**
   * Load doctor records on init
   */
  useEffect(() => {
    if (!medicaments.length) {
      logic.loadMedicaments().then((response: any) => {
        onDataLoad(response);
      });
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={t('Medicaments')}></PageTitle>

        <div className="row">
          <div className="col-sm-12 col-md-8">
            <MedicamentsTable medicaments={medicaments}></MedicamentsTable>

            <CustomPagination url='medicaments' pagination={pagination} onDataLoad={onDataLoad}></CustomPagination>
          </div>

          <div className="col-sm-12 col-md-4">
            Doctor preview
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicamentsList;