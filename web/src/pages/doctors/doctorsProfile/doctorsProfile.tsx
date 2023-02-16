import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../../context/loadingContext/loadingContextProvider";
import DoctorsLogic from "../doctorsLogic";
import { useTranslation } from 'react-i18next';
import { DoctorType } from "../../../ts/types";
import DoctorCard from "../../../components/doctor/doctorCard/doctorCard";

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
          <h3>{t('Dr.') + ' ' + doctor.full_name} </h3>
        </div>

        <div className="page--content doctor-profile--page">
          <div className="row">
            {/* Main column - Doctors information */}
            <div className="col-sm-12 col-md-8">
              <div className="row">
                {/* Base */}
                <div className="col-12 mb-4">
                  <DoctorCard doctor={doctor}></DoctorCard>
                </div>

                {/* Description */}
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="border-bottom pb-1">{t('About me')}</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p>{doctor.description}</p>
                    </div>
                  </div>
                </div>

                {/* Personal health check tests */}
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="border-bottom pb-1">{t('Health checks')}</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa harum nisi quos cupiditate deleniti veritatis accusantium consequuntur natus, corrupti soluta, delectus sint, vel dicta obcaecati inventore. Rem sit reprehenderit cumque?</p>
                    </div>
                  </div>
                </div>

                {/* Recommends */}
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="border-bottom pb-1">{t('Recommends')}</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa harum nisi quos cupiditate deleniti veritatis accusantium consequuntur natus, corrupti soluta, delectus sint, vel dicta obcaecati inventore. Rem sit reprehenderit cumque?</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="border-bottom pb-1">{t('Address')}</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa harum nisi quos cupiditate deleniti veritatis accusantium consequuntur natus, corrupti soluta, delectus sint, vel dicta obcaecati inventore. Rem sit reprehenderit cumque?</p>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="border-bottom pb-1">{t('Reviews')}</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa harum nisi quos cupiditate deleniti veritatis accusantium consequuntur natus, corrupti soluta, delectus sint, vel dicta obcaecati inventore. Rem sit reprehenderit cumque?</p>
                    </div>
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