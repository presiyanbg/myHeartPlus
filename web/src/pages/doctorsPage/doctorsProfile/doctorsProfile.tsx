import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../../../context/loadingContext/loadingContextProvider";
import { useTranslation } from 'react-i18next';
import { DoctorType } from "../../../ts/types";
import { SELECTORS } from "../../../constants/selectors";
import { scrollToElement } from "../../../utils/utils";

import DoctorCard from "../../../components/doctorComponents/doctorCard/doctorCard";
import DoctorsLogic from "../doctorsLogic";
import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import DoctorDescription from "../../../components/doctorComponents/doctorDescription/doctorDescription";
import HealthTestsFromDoctor from "../../../components/healthTestComponents/healthTestsFromDoctor/healthTestsFromDoctor";

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
        scrollToElement(`.${SELECTORS.anchorScroll}`);
      });
    }
  }, [id]);

  if ((!doctor || !doctor.user_id) && !isLoading) {
    return (<>No results found</>)
  }

  return (
    <div className="wrapper">
      <div className="page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={t('Dr.') + ' ' + doctor.full_name}
          breadCrumbs={[
            { url: "/doctors", title: t('Find your doctor') }
          ]}></PageTitle>
        {/* <div className="page--title">
          <h4>
            <Link to='/doctors'>{t('Find your doctor') + '/'}</Link>  {t('Dr.') + ' ' + doctor.full_name}
          </h4>
        </div> */}

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
                <DoctorDescription description={doctor.description}></DoctorDescription>

                {/* Personal health check tests */}
                <HealthTestsFromDoctor doctor_id={doctor.id}></HealthTestsFromDoctor>

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