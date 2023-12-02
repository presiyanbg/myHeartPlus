'use client';
import StarsRating from "../../common/starsRating/starsRating";
import Link from "next/link";
import { v4 as uuid } from 'uuid';
import { DoctorType } from "../../../ts/types";
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";

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
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <div className="flex w-full pb-2 flex-wrap">
                            {/* Doctor full name */}
                            <div className="w-2/4 md:w-2/4">
                                <h4>{props.doctor.full_name}</h4>
                            </div>

                            {/* Doctor category */}
                            <div className="w-2/4 text-right">
                                {
                                    props.doctor.specialty && (
                                        <Chip
                                            color="primary"
                                            size="sm"
                                            variant="solid">
                                            {t(props.doctor.specialty)}
                                        </Chip>
                                    )
                                }
                            </div>

                            {/* Doctor rating */}
                            <div className="w-2/4 pt-1">
                                <StarsRating rating={props.doctor.rating}></StarsRating>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody>
                        {/* Doctor picture */}
                        <Image
                            alt="Doctor profile picture"
                            className="object-cover"
                            height={200}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${props?.doctor?.image}`}
                        />
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}

export default DoctorLink;