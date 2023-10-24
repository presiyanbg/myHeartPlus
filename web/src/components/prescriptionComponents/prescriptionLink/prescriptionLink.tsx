import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";

import { v4 as uuid } from 'uuid';
import { PrescriptionType } from "../../../ts/types";
import { Link } from "react-router-dom";

type Props = {
    prescription: PrescriptionType | any
}

const PrescriptionLink = (props: Props) => {
    if (!props.prescription) return (<></>);

    return (
        <Link to={`/prescriptions/${props.prescription.id}`}
            className="component-link"
            key={uuid()}
            style={{ "--category-bg-color": props.prescription?.category?.bg_color } as React.CSSProperties}>
            {/* Prescription title */}
            <div className="component-link__title">
                <h4>{props.prescription.title}</h4>
            </div>

            {/* Prescription description */}
            <div className="component-link__description text--ellipsis--2 mb-2">
                <p>{props.prescription.description}</p>
            </div>

            {/* Prescription category and rating */}
            <div className="row">
                <div className="col-6">
                    {
                        props.prescription?.category && (
                            <span className="badge rounded-pill"
                                style={{
                                    'color': props.prescription?.category?.font_color,
                                    'backgroundColor': props.prescription?.category?.bg_color,
                                }}>
                                {props.prescription.category?.title}
                            </span>
                        )
                    }
                </div>

                <div className="col-6 text-end">
                    <StarsRating rating={props.prescription.rating} format={{ starsCol: 'col-12 text-end' }}></StarsRating>
                </div>
            </div>
        </Link>
    )
}

export default PrescriptionLink