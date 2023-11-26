'use client';
import StarsRating from "../../common/starsRating/starsRating";
import Link from "next/link";
import { v4 as uuid } from 'uuid';
import { DoctorType } from "../../../ts/types";
import { Card, CardBody, CardHeader, Divider, ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { parseDateAndTime } from "@/utils/utils";

type Props = {
    doctor: DoctorType
}

const DoctorLink = (props: Props) => {
    const t = useTranslations();

    if (!props?.doctor) return (<></>);

    return (
        <div className="pb-7">
            <Link href={`/doctors/${props.doctor.id}`} key={uuid()}>
                <Card>
                    <CardHeader className="flex justify-between">
                        {/* Doctor title */}
                        <div className="font-bold">
                            <h4>{props.doctor.full_name}</h4>
                        </div>

                        <StarsRating
                            rating={props.doctor.rating}
                            format={{ starsCol: 'flex justify-end' }}></StarsRating>
                    </CardHeader>

                    <Divider></Divider>

                    <CardBody>
                        {/* Doctor description */}
                        <ScrollShadow className="h-[150px]">
                            <p>{props.doctor.description}</p>
                        </ScrollShadow>

                        {/* Doctor category and rating */}
                        <div className="flex pt-2">
                            <div className="w-1/2">
                                {
                                    props.doctor.specialty && (
                                        <span className="px-2 py-1 rounded-3xl mr-2">
                                            {t(props.doctor.specialty)}
                                        </span>
                                    )
                                }

                                <span>{parseDateAndTime(props.doctor.created_at)}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}

export default DoctorLink;