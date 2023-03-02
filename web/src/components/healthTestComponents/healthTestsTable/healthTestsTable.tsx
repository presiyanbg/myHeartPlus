import HealthTestLink from "../healthTestLink/healthTestLink";

import { v4 as uuid } from 'uuid';
import { HealthTestType, HealthTestsType } from "../../../ts/types";

type Props = {
  healthTests: HealthTestsType | any
}

const HealthTestsTable = (props: Props) => {
  if (!props?.healthTests) return (<></>);

  return (
    <div className="health-test--table">
      {
        props.healthTests.map((test: HealthTestType) => {
          return (<HealthTestLink test={test} key={uuid()}></HealthTestLink>);
        })
      }
    </div>
  )
}

export default HealthTestsTable;