import MedicamentLink from "../../medicamentComponents/medicamentLink/medicamentLink";
import PrescriptionLink from "../../prescriptionComponents/prescriptionLink/prescriptionLink";

import { useTranslation } from 'react-i18next';

type Props = {
  advice: any
}

const HealthTestResult = (props: Props) => {
  const { t } = useTranslation();
  if (!props.advice) return <> No advice based on your results </>;

  return (
    <div className="row">
      <div className="row mb-3">
        <div className="col-12">
          <h3>{props.advice?.title}</h3>
        </div>

        <div className="col-12">
          <p>{props.advice.content}</p>
        </div>
      </div>

      {/* Prescriptions */}
      {
        props.advice.prescription && (
          <div className="row">
            <div className="col-12">
              <h4 className="border-bottom pb-1">{t('Suggested treatment based on your result')}</h4>
            </div>

            <div className="col-12">
              <PrescriptionLink prescription={props.advice.prescription}></PrescriptionLink>
            </div>
          </div>
        )
      }

      {/* Medicaments */}
      {
        props.advice.medicament && (
          <div className="row">
            <div className="col-12">
              <h4 className="border-bottom pb-1">{t('Suggested medicament based on your result')}</h4>
            </div>

            <div className="col-12">
              <MedicamentLink medicament={props.advice.medicament}></MedicamentLink>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default HealthTestResult;