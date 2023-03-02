import HealthTestsFromDoctor from "../../healthTestComponents/healthTestsFromDoctor/healthTestsFromDoctor";
import PrescriptionsFromDoctor from "../../prescriptionComponents/prescriptionsFromDoctor/prescriptionsFromDoctor";
import DoctorCard from "../doctorCard/doctorCard";
import DoctorDescription from "../doctorDescription/doctorDescription";

import { DoctorType } from "../../../ts/types";
import { useTranslation } from 'react-i18next';

type Props = {
  doctor: DoctorType
}

const DoctorView = (props: Props) => {
  const { t } = useTranslation();

  if (!props?.doctor) return (<></>);

  return (
    <div className="row">
      {/* Main column - Doctors information */}
      <div className="col-sm-12 col-md-8">
        <div className="row">
          {/* Base */}
          <div className="col-12 mb-4">
            <DoctorCard doctor={props.doctor}></DoctorCard>
          </div>

          {/* Description */}
          <DoctorDescription description={props.doctor.description}></DoctorDescription>

          {/* Personal health check tests */}
          <HealthTestsFromDoctor doctor_id={props.doctor.id}></HealthTestsFromDoctor>

          {/* Recommends */}
          <PrescriptionsFromDoctor doctor_id={props.doctor.id}></PrescriptionsFromDoctor>

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
  )

}

export default DoctorView;