
import PrescriptionLink from '../prescriptionLink/prescriptionLink';

import { PrescriptionsType } from '../../../ts/types';
import { v4 as uuid } from 'uuid';

type Props = {
  prescriptions: PrescriptionsType | any,
}

const PrescriptionsTable = (props: Props) => {
  if (!props.prescriptions || !props.prescriptions.length) {
    return (<></>);
  }

  return (
    <div className="prescriptions--table">
      {
        props.prescriptions.map((prescription: any) => {
          return (<PrescriptionLink prescription={prescription} key={uuid()}></PrescriptionLink>);
        })
      }
    </div >
  )
}

export default PrescriptionsTable;