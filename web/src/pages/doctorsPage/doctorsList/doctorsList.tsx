import React, { useState, useEffect } from 'react';
import MedicalProfilesList from '../../../components/medicalProfilesComponents/medicalProfilesList/medicalProfilesList';
import CustomPagination from '../../../components/paginationComponents/customPagination';
import DoctorsLogic from '../doctorsLogic';
import PageTitle from '../../../components/commonComponents/pageTitle/pageTitle';

import { DoctorsType, PaginationType } from '../../../ts/types';
import { useTranslation } from 'react-i18next';
import { SELECTORS } from "../../../constants/selectors";
import { scrollToElement } from "../../../utils/utils";

type Props = {};

const DoctorsList = ({ }: Props) => {
  const [doctors, setDoctors] = useState<any | DoctorsType>([]);
  const [pagination, setPagination] = useState<PaginationType>();

  const logic = DoctorsLogic();

  const { t } = useTranslation();

  /**
   * Save loaded data 
   * 
   * @param data API paginated response
   */
  const onDataLoad = (data: any) => {
    if (data?.doctors?.data) {
      setDoctors(data.doctors.data);
      setPagination(data.doctors);
      scrollToElement(`.${SELECTORS.anchorScroll}`);
    }
  }

  /**
   * Load doctor records on init
   */
  useEffect(() => {
    if (!doctors.length) {
      logic.loadDoctors().then((response: any) => {
        onDataLoad(response);
      });
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={t('Find your doctor')}></PageTitle>

        <div className="row">
          <div className="col-sm-12 col-md-8">
            <MedicalProfilesList records={doctors} type='doctors'></MedicalProfilesList>

            <CustomPagination url='doctors' pagination={pagination} onDataLoad={onDataLoad}></CustomPagination>
          </div>

          <div className="col-sm-12 col-md-4">
            Doctor preview
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsList;
