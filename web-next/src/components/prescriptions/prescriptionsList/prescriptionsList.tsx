'use client';

import Pagination from "@/components/pagination/pagination";
import Filter from "@/components/common/filter/filter";
import PrescriptionLink from "../prescriptionLink/prescriptionLink";

import { SELECTORS } from "@/constants/selectors";
import { PaginationType, PrescriptionType, PrescriptionsType } from "@/ts/types";
import { scrollToElement } from "@/utils/utils";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useTranslations } from "next-intl";

type Props = {
    prescriptions: PrescriptionsType,
    pagination?: PaginationType
}

const PrescriptionsList = (props: Props) => {
    const [prescriptions, setPrescriptions] = useState<PrescriptionsType>(props?.prescriptions || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);
    const t = useTranslations();

    if (!prescriptions) return (<></>);

    /**
         * Load tests data
         * 
         * @param data PaginationType data 
         * @param autoScroll boolean -- Used on page change 
         */
    const onDataLoad = (data: any, autoScroll: boolean = false): void => {
        if (!data?.prescriptions?.data) return;

        setPrescriptions(data.prescriptions.data);
        setPagination(data.prescriptions);
        autoScroll && scrollToElement(`.${SELECTORS.anchorScroll}`);
    }

    return (
        <>
            <Filter title={t('Тreatments')}></Filter>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pb-5">
                {
                    prescriptions?.map((prescription: PrescriptionType) => {
                        return (
                            <PrescriptionLink prescription={prescription} key={uuid()}></PrescriptionLink>
                        )
                    })
                }
            </div>


            <Pagination pagination={pagination} url='health-tests' onDataLoad={onDataLoad} />
        </>
    )
}

export default PrescriptionsList;