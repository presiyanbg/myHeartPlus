import { v4 as uuid } from 'uuid';
import { HealthTestType } from "../../../ts/types";
import { Link } from "react-router-dom";

import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";
import ImageLoader from '../../loadersComponents/imageLoader/imageLoader';

type Props = {
  medicament: any
}

const MedicamentLink = (props: Props) => {
  if (!props.medicament) return (<></>);

  return (
    <Link to={`/medicaments/${props.medicament.id}`}
      className="component--link"
      key={uuid()}
      style={{ "--category-bg-color": props.medicament.category.bg_color } as React.CSSProperties}>
      <div className="row">
        <div className="col-2 link-image">
          <ImageLoader src={props.medicament.image}></ImageLoader>
        </div>

        <div className="col">
          {/* Medicament title */}
          <div className="link-title">
            <h4>{props.medicament.title}</h4>
          </div>

          {/* Medicament description */}
          <div className="link-description text-ellipsis--2 mb-2">
            <p>{props.medicament.description}</p>
          </div>

          {/* Medicament category and rating */}
          <div className="row">
            <div className="col-6">
              {
                props.medicament.category && (
                  <span className="badge rounded-pill"
                    style={{
                      'color': props.medicament?.category?.font_color,
                      'backgroundColor': props.medicament?.category?.bg_color,
                    }}>
                    {props.medicament.category.title}
                  </span>
                )
              }
            </div>

            <div className="col-6 text-end">
              <StarsRating rating={props.medicament.rating} format={{ starsCol: 'col-12 text-end' }}></StarsRating>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


export default MedicamentLink