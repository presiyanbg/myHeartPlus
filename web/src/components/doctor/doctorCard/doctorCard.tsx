import { DoctorType } from "../../../ts/types";
import ImageLoader from "../../loaders/imageLoader/imageLoader";
import { useTranslation } from 'react-i18next';

type Props = {
  doctor: DoctorType | any
}

const DoctorCard = (props: Props) => {
  const { t } = useTranslation();
  const doctor = props.doctor;

  if (!props.doctor) return (<></>);

  return (
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
  )
}

export default DoctorCard;