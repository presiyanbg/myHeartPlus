'use client';
import StarsRating from "../../common/starsRating/starsRating";
import Link from "next/link";
import { v4 as uuid } from 'uuid';
import { PrescriptionType } from "../../../ts/types";
import { Card, CardBody, CardHeader, Divider, ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { parseDateAndTime } from "@/utils/utils";

type Props = {
    prescription: PrescriptionType
}

const PrescriptionLink = (props: Props) => {
    const t = useTranslations();

    if (!props?.prescription) return (<></>);

    return (
        <div className="pb-7">
            <Link href={`/prescriptions/${props.prescription.id}`} key={uuid()}>
                <Card>
                    <CardHeader className="flex justify-between">
                        {/* Prescription title */}
                        <div className="font-bold">
                            <h4>{props.prescription.title}</h4>
                        </div>

                        <StarsRating
                            rating={props.prescription.rating}
                            format={{ starsCol: 'flex justify-end' }}></StarsRating>
                    </CardHeader>

                    <Divider></Divider>

                    <CardBody>
                        {/* Prescription description */}
                        <ScrollShadow className="h-[150px]">
                            <p>{props.prescription.description}</p>
                        </ScrollShadow>

                        {/* Prescription category and rating */}
                        <div className="flex pt-2">
                            <div className="w-1/2">
                                {
                                    props.prescription.category && (
                                        <span className="px-2 py-1 rounded-3xl mr-2"
                                            style={{
                                                'color': props.prescription.category.font_color,
                                                'backgroundColor': props.prescription.category.bg_color,
                                            }}>

                                            {t(props.prescription.category.title)}
                                        </span>
                                    )
                                }

                                <span>{parseDateAndTime(props.prescription.created_at)}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}

export default PrescriptionLink;