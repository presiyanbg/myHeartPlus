import { useTranslation } from 'react-i18next';

type Props = {
  description: string
}

const DoctorDescription = (props: Props) => {
  const { t } = useTranslation();

  // Do not display component if no description is available
  if (!props.description?.length) return (<></>);

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-12">
          <h4 className="border-bottom pb-1">{t('About me')}</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorDescription;