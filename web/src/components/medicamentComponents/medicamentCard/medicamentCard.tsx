import ImageLoader from "../../loadersComponents/imageLoader/imageLoader";
import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";

import { useTranslation } from 'react-i18next';
import { MedicamentType } from "../../../ts/types";

type Props = {
    medicament: MedicamentType | any,
}

const MedicamentCard = (props: Props) => {
    const { t } = useTranslation();

    if (!props?.medicament) return <></>;

    return (
        <div className="component-card">
            {/* Medicaments image */}
            <div className="col-sm-12 col-md-5 component-card__picture">
                <ImageLoader src={props.medicament.image} alt={props.medicament.full_name}></ImageLoader>
            </div>

            {/* Medicaments stats  */}
            <div className="col-sm-12 col-md-7 component-card__content">
                <div className="row mb-5 mt-1"></div>

                {/* Name */}
                <div className="row mb-2">
                    <div className="col-5 text-end">{t('Title')}:</div>
                    <div className="col-7">{props.medicament.title}</div>
                </div>

                {/* Category */}
                {
                    props.medicament.category && (
                        <div className="row mb-2">
                            <div className="col-5 text-end">{t('Category')}:</div>
                            <div className="col-7">
                                <span className="badge rounded-pill"
                                    style={{
                                        'color': props.medicament?.category?.font_color,
                                        'backgroundColor': props.medicament?.category?.bg_color,
                                    }}>
                                    {props.medicament.category.title}
                                </span>
                            </div>
                        </div>
                    )
                }


                {/* Rating */}
                <StarsRating rating={props.medicament.rating} title="Rating" format={{ titleCol: 'col-5 text-end', starsCol: 'col-7 text-start' }}></StarsRating>

                <div className="mb-5"></div>

                <div className="row">
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-success text-white">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicamentCard;