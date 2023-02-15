import React, { useState, useEffect } from 'react';
import MedicalProfilesList from '../../../components/medicalProfiles/medicalProfilesList/medicalProfilesList';
import CustomPagination from '../../../components/pagination/customPagination';
import DoctorsLogic from '../doctorsLogic';
import { PaginationType } from '../../../ts/types';
import { useTranslation } from 'react-i18next';

type Props = {};

const DoctorsList = ({ }: Props) => {
  const [doctors, setDoctors] = useState<any>([]);
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
        <div className="page--title">
          <div className="col-6">
            <div className="title">
              <h2>{t('Find your doctor')}</h2>
            </div>
          </div>

          <div className="col-6">
            Search
          </div>
        </div>

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
