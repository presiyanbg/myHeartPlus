'use client';

import StarsRating from "@/components/common/starsRating/starsRating";

import { PrescriptionType, PrescriptionsType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { v4 as uuid } from "uuid";

type Props = {
    prescriptions: PrescriptionsType,
}

const DoctorPrescriptions = (props: Props) => {
    const t = useTranslations();

    if (!props?.prescriptions?.length) return (<></>);

    return (
        <>
            {
                props?.prescriptions?.map((prescription: PrescriptionType) => {
                    return (
                        <Link href={`/prescriptions/${prescription.id}`}
                            className="flex flex-col border-b-2 pb-2 pt-2"
                            key={uuid()}>
                            <div className="flex">
                                {/* Prescription title */}
                                <div className="w-2/3 font-bold">
                                    <h5>{prescription.title}</h5>
                                </div>

                                <div className="w-1/3">
                                    <StarsRating
                                        rating={prescription.rating}
                                        format={{ starsCol: 'flex justify-end' }}></StarsRating>
                                </div>
                            </div>

                            {/* Prescription category and rating */}
                            <div className="flex pt-2">
                                <div className="w-1/2">
                                    {
                                        prescription.category && (
                                            <span className="px-2 py-1 rounded-3xl mr-2"
                                                style={{
                                                    'color': prescription.category.font_color,
                                                    'backgroundColor': prescription.category.bg_color,
                                                }}>

                                                {t(prescription.category.title)}
                                            </span>
                                        )
                                    }

                                    <span>{parseDateAndTime(prescription.created_at)}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )

}

export default DoctorPrescriptions;