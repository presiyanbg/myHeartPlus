'use client';
import Category from "@/components/common/category/category";
import StarsRating from "@/components/common/starsRating/starsRating";
import { HealthCategoryType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { ScrollShadow } from "@nextui-org/react";

type Props = {
    title: string,
    description: string,
    rating: number,
    created_at: string,
    category?: HealthCategoryType | undefined,
}

const PageDescription = (props: Props) => {
    if (!props?.title?.length) return (<></>);

    return (
        <>
            <div className="flex justify-between pb-3">
                <div>
                    <h3 className="w-full pb-2">{props?.title}</h3>

                    <div className="text-small">
                        <Category category={props?.category}></Category>

                        <span className="pl-1">{parseDateAndTime(props?.created_at)}</span>
                    </div>
                </div>

                <div className="pt-1">
                    <StarsRating
                        rating={props.rating}
                        format={{ starsCol: 'flex justify-end' }}></StarsRating>
                </div>
            </div>

            <ScrollShadow className="h-[200px]">
                <p>{props?.description}</p>
            </ScrollShadow>
        </>
    )
}

export default PageDescription;