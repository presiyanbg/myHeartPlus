import { PatientType } from "../../../ts/types";

type Props = {
  patient: PatientType | any
}

const PatientStatistic = (props: Props) => {
  if (!props.patient) return <></>;

  return (
    <div className="row">
      <div className="col-12">
      </div>
    </div>
  )

}

export default PatientStatistic;