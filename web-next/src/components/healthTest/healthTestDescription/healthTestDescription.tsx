'use client';
import Category from "@/components/common/category/category";
import StarsRating from "@/components/common/starsRating/starsRating";
import { HealthTestType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Accordion, AccordionItem, ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";

type Props = {
    test: HealthTestType,
}

const HealthTestDescription = (props: Props) => {
    const test = props?.test as HealthTestType;
    const t = useTranslations();

    if (!test?.title?.length) return (<></>);

    return (
        <>
            <div className="flex justify-between pb-3">
                <div>
                    <h3 className="w-full pb-2">{test?.title}</h3>

                    <div className="text-small">
                        <Category category={test?.category}></Category>

                        <span className="pl-1">{parseDateAndTime(test?.created_at)}</span>
                    </div>
                </div>

                <div className="pt-1">
                    <StarsRating
                        rating={test.rating}
                        format={{ starsCol: 'flex justify-end' }}></StarsRating>
                </div>
            </div>

            <ScrollShadow className="h-[200px]">
                <p>{test?.description}</p>
            </ScrollShadow>
        </>
    )
}

export default HealthTestDescription;