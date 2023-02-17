import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

import HealthTestsLogic from '../healthTestsLogic';
import { Link } from 'react-router-dom';

type Props = {
  doctor_id: number
}

const HealthTestsFromDoctor = (props: Props) => {
  const [tests, setTests] = useState<any[]>();

  const { t } = useTranslation();

  const logic = HealthTestsLogic();

  useEffect(() => {
    if (!props.doctor_id) return;

    logic.loadDoctorTestsPreview(props.doctor_id).then(result => {
      setTests(result);
    });

  }, [props.doctor_id])

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-12">
          <h4 className="border-bottom pb-1">{t('Health checks')}</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {
            !!tests?.length && tests.map((test: any) => {
              return (
                <Link to={`/check/${test.id}`} className="col-12 row" key={uuid()}>
                  {/* Icon pointer */}
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon className="rotate--90" icon={faArrowTurnUp} />
                  </div>

                  {/* Test preview */}
                  <div className="col-11 health-check--preview">
                    {/* Test title */}
                    <div className="row">
                      <div className="col-12 health-check--title">
                        <h5>{test.title}</h5>
                      </div>
                    </div>

                    {/* Test description */}
                    <div className="row">
                      <div className="col-12">
                        <p>{test.description}</p>
                      </div>
                    </div>

                    {/* Test category && rating */}
                    <div className="row">
                      <div className="col-6">
                        <span className="badge rounded-pill text-bg-light ">{test.category}</span>
                      </div>

                      <div className="col-6 text-end">
                        <span className="badge rounded-pill text-bg-success text-white">{test.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default HealthTestsFromDoctor;