'use client';
import { RATING_SYSTEM } from "../../../constants/rating";
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { Tooltip } from "@nextui-org/react";

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
    const t = useTranslations();

    // Format stars based on rating 
    useEffect(() => {
        setRatingStars(() => {
            return RATING_SYSTEM.map((rating, index) => {
                let className = 'text-gray-300';

                if (!props.rating && index == 0) {
                    className = 'text-red-500';
                }

                if (rating.order <= props.rating && props.rating > 0) {
                    className = 'text-yellow-500';
                }

                if (rating.order <= props.rating && props.rating >= 4) {
                    className = 'text-green-500';
                }

                return (
                    <Tooltip content={t(rating?.title)} key={uuid()}>
                        <FontAwesomeIcon icon={faStar} className={className} />
                    </Tooltip>
                );
            });
        });
    }, [props.rating]);

    // Table format
    // Only start
    if (props.format && !props.title) {
        return (
            <>
                {
                    props.format?.starsCol?.length && (
                        <div className={props.format.starsCol}>
                            {ratingStars}
                        </div>
                    )
                }
            </>
        )
    }

    // Table format
    // Title is required
    if (props.format && props.title) {
        return (
            <div className="flex" >
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
        <>
            {/* Display title */}
            {
                props.title?.length && (
                    <div className="stars-rating--title">
                        {t(props.title)}:
                    </div>
                )
            }

            {/* Rating stars */}
            <div className="flex">
                {ratingStars}
            </div>
        </>
    )
}

export default StarsRating;