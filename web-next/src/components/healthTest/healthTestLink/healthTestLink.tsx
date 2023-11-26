'use client';
import StarsRating from "../../common/starsRating/starsRating";
import Link from "next/link";
import { v4 as uuid } from 'uuid';
import { HealthTestType } from "../../../ts/types";
import { Card, CardBody, CardHeader, Divider, ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { parseDateAndTime } from "@/utils/utils";

type Props = {
    test: HealthTestType
}

const HealthTestLink = (props: Props) => {
    const t = useTranslations();

    if (!props?.test) return (<></>);

    return (
        <div className="pb-7">
            <Link href={`/health-tests/${props.test.id}`} key={uuid()}>
                <Card>
                    <CardHeader className="flex justify-between">
                        {/* Test title */}
                        <div className="font-bold">
                            <h4>{props.test.title}</h4>
                        </div>

                        <StarsRating
                            rating={props.test.rating}
                            format={{ starsCol: 'flex justify-end' }}></StarsRating>
                    </CardHeader>

                    <Divider></Divider>

                    <CardBody>
                        {/* Test description */}
                        <ScrollShadow className="h-[150px]">
                            <p>{props.test.description}</p>
                        </ScrollShadow>

                        {/* Test category and rating */}
                        <div className="flex pt-2">
                            <div className="w-1/2">
                                {
                                    props.test.category && (
                                        <span className="px-2 py-1 rounded-3xl mr-2"
                                            style={{
                                                'color': props.test.category.font_color,
                                                'backgroundColor': props.test.category.bg_color,
                                            }}>

                                            {t(props.test.category.title)}
                                        </span>
                                    )
                                }

                                <span>{parseDateAndTime(props.test.created_at)}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}

export default HealthTestLink;