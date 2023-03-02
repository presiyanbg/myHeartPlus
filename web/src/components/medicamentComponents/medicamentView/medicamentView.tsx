import Moment from "react-moment";
import ImageLoader from "../../loadersComponents/imageLoader/imageLoader";
import MedicamentCard from "../medicamentCard/medicamentCard";

import { useTranslation } from 'react-i18next';

type Props = {
  medicament: any,
}

const MedicamentView = (props: Props) => {
  const { t } = useTranslation();

  if (!props?.medicament) return <></>;

  return (
    <div className="row">
      {/* Medicament card */}
      <div className="col-12 mb-4">
        <MedicamentCard medicament={props.medicament}></MedicamentCard>
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
            {props.medicament.description}
          </div>
        </div>
      </div>

    </div>
  )

}

export default MedicamentView;