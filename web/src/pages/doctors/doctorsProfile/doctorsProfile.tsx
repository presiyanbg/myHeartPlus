import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../../context/loadingContext/loadingContextProvider";
import DoctorsLogic from "../doctorsLogic";
import ImageLoader from "../../../components/loaders/imageLoader/imageLoader";
import { useTranslation } from 'react-i18next';
import { DoctorType } from "../../../ts/types";

const DoctorsProfile = () => {
  const [doctor, setDoctor] = useState<any | DoctorType>({});
  const { isLoading } = useContext(LoadingContext);

  const logic = DoctorsLogic();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id != undefined) {
      logic.loadDoctor(id).then(doctorData => {
        setDoctor(doctorData.doctor);
      });
    }
  }, [id]);

  if ((!doctor || !doctor.user_id) && !isLoading) {
    return (<>No results found</>)
  }

  return (
    <div className="wrapper">
      <div className="page">
        <div className="page--title">
          {t('Dr.') + ' ' + doctor.full_name}
        </div>

        <div className="page--content doctor-profile--page">
          <div className="row">
            {/* Main column - Doctors information */}
            <div className="col-sm-12 col-md-8">
              <div className="row">
                {/* Base */}
                <div className="col-12 row mb-2">
                  <div className="profile-card">
                    {/* Doctors image */}
                    <div className="col-sm-12 col-md-5 profile-picture">
                      <ImageLoader src={doctor.image} alt={doctor.full_name}></ImageLoader>
                    </div>

                    {/* Doctors stats  */}
                    <div className="col-sm-12 col-md-7">
                      <div className="row mb-3"></div>

                      {/* Name */}
                      <div className="row mb-2">
                        <div className="col-5 text-end">{t('Name')}:</div>
                        <div className="col-7">{doctor.full_name}</div>
                      </div>

                      {/* Specialty */}
                      <div className="row mb-2">
                        <div className="col-5 text-end">{t('Specialty')}:</div>
                        <div className="col-7">{doctor.specialty}</div>
                      </div>

                      {/* Mobile number */}
                      <div className="row mb-2">
                        <div className="col-5 text-end">{t('Mobile number')}:</div>
                        <div className="col-7">
                          <a href={'tel:' + doctor.mobile_number}>{doctor.mobile_number}</a>
                        </div>
                      </div>

                      {/* Office number */}
                      <div className="row mb-2">
                        <div className="col-5 text-end">{t('Office number')}:</div>
                        <div className="col-7">
                          <a href={'tel:' + doctor.office_number}>{doctor.office_number}</a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="row mb-4">
                        <div className="col-5 text-end">{t('Address')}:</div>
                        <div className="col-7">
                          <p>
                            {doctor.address_1},
                            {doctor.address_2},
                            {doctor.address_3},
                            {doctor.address_4},
                            {doctor.address_5},
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="row mb-2 text-center">
                        <div className="col-12">
                          <h3 className="btn btn-success text-white">
                            {t('Rating') + ' : ' + doctor.rating}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="row">
                      <h4>{t('About me')}</h4>
                    </div>
                  </div>

                  <div className="row">
                    <p>{doctor.description}</p>
                  </div>
                </div>

                {/* Personal health check tests */}
                <div className="col-12">
                  <div className="row">
                    <h4>{t('Health checks')}</h4>
                  </div>

                  <div className="row">

                  </div>
                </div>

                {/* Recommends */}
                <div className="col-12">
                  <div className="row">
                    <h4>{t('Recommends')}</h4>
                  </div>

                  <div className="row">

                  </div>
                </div>

                {/* Map */}
                <div className="col-12">
                  <div className="row">
                    <h4>{t('Address')}</h4>
                  </div>

                  <div className="row">

                  </div>
                </div>

                {/* Reviews */}
                <div className="col-12">
                  <div className="row">
                    <h4>{t('Reviews')}</h4>
                  </div>

                  <div className="row">

                  </div>
                </div>
              </div>
            </div>

            {/* Side column */}
            <div className="col-sm-12 col-md-4">
              Add
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsProfile;