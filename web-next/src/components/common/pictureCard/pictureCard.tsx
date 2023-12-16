'use client';
import Category from "../category/category";
import StarsRating from "../starsRating/starsRating";

import { Card, CardBody, Image } from "@nextui-org/react";
import { HealthCategoryType } from "@/ts/types";
import { useState } from "react";

type Props = {
    title: string,
    content: string,
    subTitle?: string,
    imageSrc?: string,
    category?: HealthCategoryType,
    rating?: number,
    sponsorIcon?: boolean,
}

const PictureCard = (props: Props) => {
    const [hasImage, setHasImage] = useState<boolean>(!!(props?.imageSrc != undefined && props?.imageSrc?.length > 0))

    const pictureCardSponsor: HealthCategoryType = {
        id: 10000,
        title: 'Sponsor',
        description: 'Sponsor icon',
        font_color: '#374151',
        bg_color: '#FCD34D',
        created_at: '',
        updated_at: '',
    }

    return (
        <Card shadow="sm" isPressable className="w-full">
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    {/* Image */}
                    {
                        hasImage && (
                            <div className="relative col-span-6 md:col-span-4">
                                <Image
                                    isZoomed
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    onError={() => { setHasImage(false) }}
                                    alt={props.title}
                                    className="w-full object-cover h-[180px]"
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${props?.imageSrc}`} />
                            </div>
                        )
                    }

                    <div className={'h-full py-1 flex flex-col justify-between ' + (hasImage ? 'col-span-6 md:col-span-8 ' : ' col-span-12 md:grid-cols-12 ')}>
                        <div>
                            {/* Title and rating */}
                            <div className="pr-2 flex flex-col md:flex-row justify-between pb-2">
                                <h4 className="pb-2 md:pb-0">{props.title}</h4>

                                {
                                    !!(props.rating != undefined && props.rating != null) && (
                                        <StarsRating rating={props.rating}></StarsRating>
                                    )
                                }

                            </div>

                            {/* Content */}
                            <div className="py-2 pb-4">
                                <p className="text-black text-tiny text--5-lines">
                                    {props.content}
                                </p>
                            </div>
                        </div>

                        {/* Sponsor icon, Category, Sub title */}
                        <div className="flex flex-wrap justify-between text-tiny">
                            <div className="pb-2 md:pb-0">
                                {
                                    !!(props?.sponsorIcon) && (
                                        <Category category={pictureCardSponsor}></Category>
                                    )
                                }

                                <Category category={props.category}></Category>
                            </div>

                            <div className="md:text-right pr-2">
                                {props.subTitle}
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default PictureCard;