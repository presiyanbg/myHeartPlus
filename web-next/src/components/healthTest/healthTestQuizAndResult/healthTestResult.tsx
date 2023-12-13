'use client';
import PrescriptionLink from "@/components/prescriptions/prescriptionLink/prescriptionLink";
import MedicamentLink from "@/components/medicaments/medicamentLink/medicamentsLink";

import { HealthTestAdviceType } from "../../../ts/types";
import { useTranslations } from "next-intl";

type Props = {
    advice: HealthTestAdviceType | undefined
}

const HealthTestResult = (props: Props) => {
    const t = useTranslations();

    if (!props.advice) return <> No advice based on your results </>;

    return (
        <div className="row">
            <div className="row pb-5">
                <div className="col-12 pb-2">
                    <h3>{props.advice?.title}</h3>
                </div>

                <div className="col-12">
                    <p>{props.advice.content}</p>
                </div>
            </div>

            {/* Prescriptions */}
            {
                props.advice.prescription && (
                    <div className="row">
                        <div className="col-12">
                            <h4 className="pb-3">{t('Suggested treatment based on your result')}</h4>
                        </div>

                        <div className="col-12">
                            <PrescriptionLink prescription={props.advice.prescription}></PrescriptionLink>
                        </div>
                    </div>
                )
            }

            {/* Medicaments */}
            {
                props.advice.medicament && (
                    <div className="row">
                        <div className="col-12">
                            <h4 className="pb-3">{t('Suggested medicament based on your result')}</h4>
                        </div>

                        <div className="col-12">
                            <MedicamentLink medicament={props.advice.medicament}></MedicamentLink>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HealthTestResult;