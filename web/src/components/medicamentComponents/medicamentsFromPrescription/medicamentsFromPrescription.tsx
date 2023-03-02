import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

import MedicamentLink from "../medicamentLink/medicamentLink";

type Props = {
  medicaments: any[]
}

const MedicamentsFromPrescription = (props: Props) => {
  const { t } = useTranslation();

  if (!props.medicaments || !props.medicaments.length) return (<></>);

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-12">
          <h4 className="border-bottom pb-1">{t('Medicaments')}</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {
            !!props.medicaments?.length && props.medicaments.map((medicament: any) => {
              return (
                <div className="col-12 row" key={uuid()}>
                  {/* Icon pointer */}
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon className="rotate--90" icon={faArrowTurnUp} />
                  </div>

                  {/* Medicament preview */}
                  <div className="col-11 d-flex">
                    <MedicamentLink medicament={medicament}></MedicamentLink>
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

export default MedicamentsFromPrescription