import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { HealthTestType } from "../../../ts/types";
import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";

type Props = {
  test: HealthTestType
}

const HealthTestLink = (props: Props) => {
  if (!props?.test) return (<></>);

  return (
    <Link to={`/health-tests/${props.test.id}`}
      className="health-test--link"
      key={uuid()}
      style={{ "--category-bg-color": props.test.category.bg_color } as React.CSSProperties}>
      {/* Test title */}
      <div className="test-title">
        <h4>{props.test.title}</h4>
      </div>

      {/* Test description */}
      <div className="text-description text-ellipsis--2 mb-2">
        <p>{props.test.description}</p>
      </div>

      {/* Test category and rating */}
      <div className="row">
        <div className="col-6">
          {
            props.test.category && (
              <span className="badge rounded-pill"
                style={{
                  'color': props.test.category.font_color,
                  'backgroundColor': props.test.category.bg_color,
                }}>
                {props.test.category.title}
              </span>
            )
          }
        </div>

        <div className="col-6 text-end">
          <StarsRating rating={props.test.rating} format={{ starsCol: 'col-12 text-end' }}></StarsRating>
        </div>
      </div>
    </Link>
  )
}

export default HealthTestLink;