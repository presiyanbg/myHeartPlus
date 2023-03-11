import HealthTestsLogic from '../healthTestsLogic';
import HealthTestLink from '../healthTestLink/healthTestLink';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import { HealthTestsType } from '../../../ts/types';

type Props = {
  doctor_id: number
}

const HealthTestsFromDoctor = (props: Props) => {
  const [tests, setTests] = useState<HealthTestsType>();

  const logic = HealthTestsLogic();

  const { t } = useTranslation();

  useEffect(() => {
    if (!props.doctor_id) return;

    logic.loadDoctorTestsPreview(props.doctor_id).then(response => {
      if (response?.data?.length) {
        setTests(response.data);
      }
    });

  }, [props.doctor_id])

  // Do not display component if no tests are available
  if (!tests?.length) return (<></>);

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
                <div className="col-12 row" key={uuid()}>
                  {/* Icon pointer */}
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon className="rotate--90" icon={faArrowTurnUp} />
                  </div>

                  {/* Test preview */}
                  <div className="col-11 d-flex health-check--preview">
                    <HealthTestLink test={test} key={uuid()}></HealthTestLink>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default HealthTestsFromDoctor;