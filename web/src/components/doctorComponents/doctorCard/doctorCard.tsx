import { DoctorType } from "../../../ts/types";
import { useTranslation } from 'react-i18next';

import ImageLoader from "../../loadersComponents/imageLoader/imageLoader";
import DoctorLogic from "../doctorLogic";
import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";

type Props = {
  doctor: DoctorType | any
}

const DoctorCard = (props: Props) => {
  const doctor = props.doctor;
  const logic = DoctorLogic();

  const { t } = useTranslation();

  if (!props.doctor) return (<></>);

  doctor.address = logic.buildDoctorAddress(doctor);

  return (
    <div className="component-card">
      {/* Doctors image */}
      <div className="col-sm-12 col-md-5 card-picture">
        <ImageLoader src={doctor.image} alt={doctor.full_name}></ImageLoader>
      </div>

      {/* Doctors stats  */}
      <div className="col-sm-12 col-md-7 card-content">
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
        <div className="row mb-2">
          <div className="col-5 text-end">{t('Address')}:</div>
          <div className="col-7">
            <p className="mb-0">
              {doctor.address}
            </p>
          </div>
        </div>

        {/* Rating */}
        <StarsRating rating={doctor.rating} title="Rating" format={{ titleCol: 'col-5 text-end', starsCol: 'col-7 text-start' }}></StarsRating>
      </div>
    </div>
  )
}

export default DoctorCard;