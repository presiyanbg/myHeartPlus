
import { v4 as uuid } from 'uuid';
import MedicamentLink from '../medicamentLink/medicamentLink';

type Props = {
  medicaments: any
}

const MedicamentsTable = (props: Props) => {
  if (!props?.medicaments || !props?.medicaments?.length) {
    return (<></>);
  }

  return (
    <div className="prescriptions--table">
      {
        props.medicaments.map((medicament: any) => {
          return (<MedicamentLink medicament={medicament} key={uuid()}></MedicamentLink>);
        })
      }
    </div >
  )
}

export default MedicamentsTable;