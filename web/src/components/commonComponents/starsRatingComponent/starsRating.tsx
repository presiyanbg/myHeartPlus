import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RATING_SYSTEM } from "../../../constants/rating";
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { classNames } from "../../../utils/utils";

type Props = {
  rating: number,
  title?: string,
  format?: {
    titleCol?: string,
    starsCol?: string
  }
}

const StarsRating = (props: Props) => {
  const [ratingStars, setRatingStars] = useState<any>([]);
  const { t } = useTranslation();

  // Format stars based on rating 
  useEffect(() => {
    setRatingStars(() => {
      return RATING_SYSTEM.map(rating => {
        let className = '';
        if (rating.order <= props.rating) {
          className = 'text-warning';
        }

        if (rating.order > props.rating) {
          className = 'text-secondary';
        }

        return (
          <OverlayTrigger
            key={uuid()}
            placement={'top'}
            overlay={
              <Tooltip id={'tooltip-' + rating.order + '-' + uuid()}>
                {t(rating.title)}
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faStar} className={className} />
          </OverlayTrigger>
        );
      });
    });
  }, [props.rating]);


  // Table format
  // Only start
  if (props.format && !props.title) {
    return (
      <div className="row" >
        {
          props.format?.starsCol?.length && (
            <div className={props.format.starsCol}>
              {ratingStars}
            </div>
          )
        }
      </div>
    )
  }

  // Table format
  // Title is required
  if (props.format && props.title) {
    return (
      <div className="row" >
        {
          props.format?.titleCol?.length && (
            <div className={props.format.titleCol}>
              {t(props.title)}:
            </div>
          )
        }

        {
          props.format?.starsCol?.length && (
            <div className={props.format.starsCol}>
              {ratingStars}
            </div>
          )
        }
      </div>
    )
  }

  // Default format
  return (
    <div className="stars-rating--wrapper">
      {/* Display title */}
      {
        props.title?.length && (
          <div className="stars-rating--title">
            {t(props.title)}:
          </div>
        )
      }

      {/* Rating stars */}
      <div className="stars-rating--content">
        {ratingStars}
      </div>
    </div>
  )
}

export default StarsRating;