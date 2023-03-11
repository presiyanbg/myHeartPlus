import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/commonComponents/pageTitle/pageTitle';
import HealthTestsLogic from '../healthTestsLogic';
import CustomPagination from '../../../components/paginationComponents/customPagination';
import HealthTestsTable from '../../../components/healthTestComponents/healthTestsTable/healthTestsTable';

import { useTranslation } from 'react-i18next';
import { SELECTORS } from '../../../constants/selectors';
import { scrollToElement } from '../../../utils/utils';
import { HealthTestType, PaginationType } from '../../../ts/types';

type Props = {};

const HealthTestsList = ({ }: Props) => {
  const [healthTests, setHealthTests] = useState<HealthTestType>();
  const [pagination, setPagination] = useState<PaginationType>();

  const logic = HealthTestsLogic();
  const { t } = useTranslation();

  /**
   * Save loaded data 
   * 
   * @param data API paginated response
   */
  const onDataLoad = (data: any) => {
    if (!data?.tests?.data) return;

    setHealthTests(data.tests.data);
    setPagination(data.tests);
    scrollToElement(`.${SELECTORS.anchorScroll}`);
  }

  /**
   * Save tests on init
   */
  useEffect(() => {
    if (!healthTests) {
      logic.loadHealthTestList().then(response => {
        onDataLoad(response)
      });
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={t('Health checks')}></PageTitle>

        <div className="row">
          <div className="col-sm-12 col-md-8">
            <HealthTestsTable healthTests={healthTests}></HealthTestsTable>

            <div className="mb-5"></div>

            <CustomPagination url='health-tests' pagination={pagination} onDataLoad={onDataLoad}></CustomPagination>
          </div>

          <div className="col-sm-12 col-md-4">
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthTestsList;
