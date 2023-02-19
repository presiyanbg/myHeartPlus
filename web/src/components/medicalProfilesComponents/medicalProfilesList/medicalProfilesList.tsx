

import ImageLoader from '../../loadersComponents/imageLoader/imageLoader';
import StarsRating from '../../starsRatingComponent/starsRating';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { DoctorsType } from '../../../ts/types';

type Props = {
  records: any[] | DoctorsType,
  type: 'patients' | 'doctors'
}

const MedicalProfilesList = (props: Props) => {
  const { t } = useTranslation();

  if (!props.records || !props.records.length) {
    return (<></>);
  }

  return (
    <div className="medical-records--list">
      {
        props.records.map(record => {
          return (
            <Link to={`/${props.type}/${record.id}`} className="medium-box" key={uuid()}>
              <div className="box--head">
                <ImageLoader src={record.image} alt={record.full_name}></ImageLoader>
              </div>

              <div className="box--body">
                <div className="box--title">
                  <h4>{record.full_name}</h4>
                </div>

                {props.type == 'doctors' && (
                  <div className="box--footer">
                    <div className="row mb-2">
                      <div className="col-6">
                        <span>
                          {t('Specialty') + ': '}
                        </span>
                      </div>

                      <div className="col-6 text-end">
                        <span className="badge rounded-pill text-bg-primary text-white">{record.specialty || 'None'}</span>
                      </div>
                    </div>

                    <StarsRating rating={record.rating} title="Rating" format={{ titleCol: 'col-6', starsCol: 'col-6 text-end' }}></StarsRating>
                  </div>
                )}
              </div>
            </Link>
          );
        })
      }

    </div>
  );
}

export default MedicalProfilesList;