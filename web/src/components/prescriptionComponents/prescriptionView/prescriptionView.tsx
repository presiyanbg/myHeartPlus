import ImageLoader from '../../loadersComponents/imageLoader/imageLoader';

import PrescriptionCard from '../prescriptionCard/prescriptionCard';
import MedicamentsFromPrescription from '../../medicamentComponents/medicamentsFromPrescription/medicamentsFromPrescription';

import { useTranslation } from 'react-i18next';
import { PrescriptionType } from '../../../ts/types';

type Props = {
  prescription: PrescriptionType | any,
}

const PrescriptionView = (props: Props) => {
  const { t } = useTranslation();

  if (!props.prescription) return (<></>);

  return (
    <div className="row">
      {/* Prescription card */}
      <div className="col-12 mb-4">
        <PrescriptionCard prescription={props.prescription}></PrescriptionCard>
      </div>

      {/* Description  */}
      <div className="col-12 mb-4">
        <div className="row">
          <div className="col-12">
            <h4 className="border-bottom pb-1">{t('Description')}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {props.prescription.description}
          </div>
        </div>
      </div>

      {/* Medicaments */}
      <MedicamentsFromPrescription medicaments={props.prescription.medicaments_array}></MedicamentsFromPrescription>

    </div>
  )
}

export default PrescriptionView