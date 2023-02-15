

import ImageLoader from '../../loaders/imageLoader/imageLoader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

type Props = {
  records: any[],
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

                <div className="box--content">
                  <h5>{t('Specialty') + ': '} <span className="badge rounded-pill text-bg-primary text-white">{record.specialty || 'None'}</span> </h5>
                </div>
              </div>
            </Link>
          );
        })
      }

    </div>
  );
}

export default MedicalProfilesList;