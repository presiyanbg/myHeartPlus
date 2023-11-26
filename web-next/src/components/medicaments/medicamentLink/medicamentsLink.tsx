'use client';
import StarsRating from "../../common/starsRating/starsRating";
import Link from "next/link";
import { v4 as uuid } from 'uuid';
import { MedicamentType } from "../../../ts/types";
import { Card, CardBody, CardHeader, Divider, ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { parseDateAndTime } from "@/utils/utils";

type Props = {
    medicament: MedicamentType
}

const MedicamentLink = (props: Props) => {
    const t = useTranslations();

    if (!props?.medicament) return (<></>);

    return (
        <div className="pb-7">
            <Link href={`/medicaments/${props.medicament.id}`} key={uuid()}>
                <Card>
                    <CardHeader className="flex justify-between">
                        {/* Medicament title */}
                        <div className="font-bold">
                            <h4>{props.medicament.title}</h4>
                        </div>

                        <StarsRating
                            rating={props.medicament.rating}
                            format={{ starsCol: 'flex justify-end' }}></StarsRating>
                    </CardHeader>

                    <Divider></Divider>

                    <CardBody>
                        {/* Medicament description */}
                        <ScrollShadow className="h-[150px]">
                            <p>{props.medicament.description}</p>
                        </ScrollShadow>

                        {/* Medicament category and rating */}
                        <div className="flex pt-2">
                            <div className="w-1/2">
                                {
                                    props.medicament.category && (
                                        <span className="px-2 py-1 rounded-3xl mr-2"
                                            style={{
                                                'color': props.medicament.category.font_color,
                                                'backgroundColor': props.medicament.category.bg_color,
                                            }}>

                                            {t(props.medicament.category.title)}
                                        </span>
                                    )
                                }

                                <span>{parseDateAndTime(props.medicament.created_at)}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}

export default MedicamentLink;