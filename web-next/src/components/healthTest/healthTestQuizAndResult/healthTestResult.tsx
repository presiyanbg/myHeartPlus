'use client';
import PrescriptionLink from "@/components/prescriptions/prescriptionLink/prescriptionLink";
import MedicamentLink from "@/components/medicaments/medicamentLink/medicamentsLink";

import { HealthTestAdviceType } from "../../../ts/types";
import { useTranslations } from "next-intl";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
    advice: HealthTestAdviceType | undefined
}

const HealthTestResult = (props: Props) => {
    const t = useTranslations();

    if (!props.advice) return (<Card>
        <CardBody>
            {t('No advice based on your results')}
        </CardBody>
    </Card>);

    return (
        <>
            <span className="text-2xl pb-2">{props.advice?.title}:</span>

            <Card>
                <CardBody>
                    <ScrollShadow className="h-[200px]">
                        <p>{props.advice.content}</p>
                    </ScrollShadow>
                </CardBody>
            </Card>

            <div className="py-3"></div>

            {/* Prescriptions */}
            {
                props.advice.prescription && (
                    <>
                        <span className="text-2xl">
                            {t('Suggested treatment based on your result')}:
                        </span>

                        <div className="py-1"></div>

                        <PrescriptionLink prescription={props.advice.prescription}></PrescriptionLink>

                        <div className="py-3"></div>
                    </>
                )
            }

            {/* Medicaments */}
            {
                props.advice.medicament && (
                    <div className="row">
                        <span className="text-2xl">
                            {t('Suggested medicament based on your result')}:
                        </span>

                        <div className="py-1"></div>

                        <div className="col-12">
                            <MedicamentLink medicament={props.advice.medicament}></MedicamentLink>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default HealthTestResult;