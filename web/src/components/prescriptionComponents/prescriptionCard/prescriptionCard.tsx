import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";

import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp, faHouseChimneyMedical, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

type Props = {
  prescription: any
}

const PrescriptionCard = (props: Props) => {
  const { t } = useTranslation();

  if (!props.prescription) return (<></>);

  // Color from category 
  const categoryColor = props.prescription?.category?.bg_color || '';

  return (
    <div className="component-card pt-4 pb-4">
      <div className="col-4 d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faHouseChimneyMedical} size="6x" className="prescription-icon" style={{ color: categoryColor }} />
      </div>

      <div className="col-8">
        {/* Title */}
        <div className="row mb-2">
          <div className="col-3 text-end">{t('Title')}:</div>
          <div className="col-9">
            {props.prescription.title}
          </div>
        </div>

        {/* Doctor */}
        <div className="row mb-2">
          <div className="col-3 text-end">{t('Doctor')}:</div>
          <div className="col-9">
            {props.prescription.doctor && (
              <Link to={`/doctors/${props.prescription.doctor_id}`}>
                {props.prescription.doctor.full_name}
              </Link>
            )}
          </div>
        </div>

        {/* Category */}
        {
          props.prescription.category && (
            <div className="row mb-2">
              <div className="col-3 text-end">{t('Category')}:</div>
              <div className="col-9">
                <span className="badge rounded-pill"
                  style={{
                    'color': props.prescription?.category?.font_color,
                    'backgroundColor': props.prescription?.category?.bg_color,
                  }}>
                  {props.prescription.category.title}
                </span>
              </div>
            </div>
          )
        }

        {/* Rating */}
        <StarsRating rating={props.prescription.rating} title="Rating" format={{ titleCol: 'col-3 text-end', starsCol: 'col-9 text-start' }}></StarsRating>
      </div>
    </div>
  );
}

export default PrescriptionCard;