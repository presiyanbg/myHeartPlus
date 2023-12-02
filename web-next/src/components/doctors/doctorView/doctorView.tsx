'use client';
import StarsRating from "@/components/common/starsRating/starsRating";
import DoctorPrescriptions from "../doctorPrescriptions/doctorPrescriptions";
import DoctorHealthTests from "../doctorHealthTests/doctorHealthTests";

import { DoctorType, HealthTestsType, PrescriptionsType } from "@/ts/types";
import { buildAddress } from "@/utils/utils";
import { Accordion, AccordionItem, Card, CardHeader, Image, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faFileLines, faMapLocationDot, faStaffSnake, faStar, faUserCircle, faUserDoctor } from '@fortawesome/free-solid-svg-icons';

type Props = {
    doctor: DoctorType,
    prescriptions?: PrescriptionsType,
    healthTests?: HealthTestsType,
    reviews?: any, // Functionality yet to be created 
}

const DoctorView = (props: Props) => {
    const [doctor, setDoctor] = useState<DoctorType>(props?.doctor as DoctorType);
    const [prescriptions, setPrescriptions] = useState<PrescriptionsType>(props?.prescriptions as PrescriptionsType);
    const [tests, setTests] = useState<HealthTestsType>(props?.healthTests as HealthTestsType);
    const t = useTranslations();

    if (!doctor) return (<>No results found </>);

    // Doctor basic info 
    const infoArray = [
        {
            title: 'Name',
            value: doctor?.full_name,
        },
        {
            title: 'Specialty',
            value: doctor?.specialty,
        },
        {
            title: 'Mobile number',
            value: doctor?.mobile_number,
        },
        {
            title: 'Office number',
            value: doctor?.office_number,
        },
        {
            title: 'Address',
            value: buildAddress([doctor?.address_1, doctor?.address_2, doctor?.address_3, doctor?.address_4, doctor?.address_5]),
        },
    ];

    return (
        <>
            {/* Doctor info */}
            <div className="pb-4">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            {/* Image and rating */}
                            <div className="w-full md:w-1/3">
                                {/* Doctor picture */}
                                <Suspense fallback={<Spinner></Spinner>}>
                                    <Image
                                        alt="Doctor profile picture"
                                        className="object-cover"
                                        height={200}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${doctor?.image}`}
                                    />
                                </Suspense>

                                {/* Rating */}
                                <div className="pt-3">
                                    <StarsRating rating={doctor.rating}></StarsRating>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="w-full md:w-2/3">
                                {
                                    infoArray?.map(info => {
                                        return (
                                            <div className="grid grid-cols-4 pb-2" key={uuid()}>
                                                <div className="col-span-2 text-right pr-2 font-bold">
                                                    {t(info.title)}
                                                </div>

                                                <div className="col-span-2">
                                                    {info.value}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            {/* Description */}
            <div className="pb-4">
                <Card>
                    <CardHeader>
                        <Accordion>
                            <AccordionItem
                                key="1"
                                aria-label={t('About me')}
                                title={t('About me')}
                                startContent={<FontAwesomeIcon icon={faUserDoctor} className="text-primary" />}>
                                {doctor?.description}
                            </AccordionItem>
                        </Accordion>
                    </CardHeader>
                </Card>
            </div>

            {/* Prescriptions */}
            {
                !!prescriptions?.length && (
                    <div className="pb-4">
                        <Card>
                            <CardHeader>
                                <Accordion>
                                    <AccordionItem
                                        key="1"
                                        aria-label={t('Тreatments')}
                                        title={t('Тreatments')}
                                        startContent={<FontAwesomeIcon icon={faStaffSnake} className="text-primary" />}>
                                        <DoctorPrescriptions prescriptions={prescriptions}></DoctorPrescriptions>
                                    </AccordionItem>
                                </Accordion>
                            </CardHeader>
                        </Card>
                    </div>
                )
            }

            {/* Health tests */}
            {
                !!tests?.length && (
                    <div className="pb-4">
                        <Card>
                            <CardHeader>
                                <Accordion>
                                    <AccordionItem
                                        key="1"
                                        aria-label={t('Health checks')}
                                        title={t('Health checks')}
                                        startContent={<FontAwesomeIcon icon={faFileLines} className="text-primary" />}>
                                        <DoctorHealthTests tests={tests}></DoctorHealthTests>
                                    </AccordionItem>
                                </Accordion>
                            </CardHeader>
                        </Card>
                    </div>
                )
            }


            {/* Reviews */}
            <div className="pb-4">
                <Card>
                    <CardHeader>
                        <Accordion>
                            <AccordionItem
                                key="1"
                                aria-label={t('Reviews')}
                                title={t('Reviews')}
                                startContent={<FontAwesomeIcon icon={faStar} className="text-primary" />}>
                                <span className="text-gray-500 font-light italic">
                                    *Functionality will be added in myHeartPlus v0.14.5b
                                </span>
                            </AccordionItem>
                        </Accordion>
                    </CardHeader>
                </Card>
            </div>

            {/* Map */}
            <div className="pb-4">
                <Card>
                    <CardHeader>
                        <Accordion>
                            <AccordionItem
                                key="1"
                                aria-label={t('Address')}
                                title={t('Address')}
                                startContent={<FontAwesomeIcon icon={faMapLocationDot} className="text-primary" />}>
                                MAP
                            </AccordionItem>
                        </Accordion>
                    </CardHeader>
                </Card>
            </div>
        </>
    );
}

export default DoctorView;