import HealthTestLink from "../healthTestLink/healthTestLink";
import { v4 as uuid } from 'uuid';

type Props = {
  healthTests: any
}

const HealthTestsTable = (props: Props) => {
  if (!props?.healthTests) return (<></>);

  return (
    <div className="health-test--table">
      {
        props.healthTests.map((test: any) => {
          return (<HealthTestLink test={test} key={uuid()}></HealthTestLink>)
        })
      }
    </div>
  )
}

export default HealthTestsTable;