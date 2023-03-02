import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

import PrescriptionsLogic from "../prescriptionsLogic";
import PrescriptionLink from "../prescriptionLink/prescriptionLink";

type Props = {
  doctor_id: number
}

const PrescriptionsFromDoctor = (props: Props) => {
  const [prescriptions, setPrescriptions] = useState<any>();

  const logic = PrescriptionsLogic();

  const { t } = useTranslation();

  useEffect(() => {
    if (!props.doctor_id) return;

    logic.loadDoctorPrescriptions(props.doctor_id).then(response => {
      if (response?.data?.length) {
        setPrescriptions(response.data);
      }
    });

  }, [props.doctor_id])

  // Do not display component if no prescriptions are available
  if (!prescriptions?.length) return (<></>);

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-12">
          <h4 className="border-bottom pb-1">{t('Recommends')}</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {
            !!prescriptions?.length && prescriptions.map((prescription: any) => {
              return (
                <div className="col-12 row" key={uuid()}>
                  {/* Icon pointer */}
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon className="rotate--90" icon={faArrowTurnUp} />
                  </div>

                  {/* Prescription preview */}
                  <div className="col-11 d-flex">
                    <PrescriptionLink prescription={prescription} key={uuid()}></PrescriptionLink>
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

export default PrescriptionsFromDoctor