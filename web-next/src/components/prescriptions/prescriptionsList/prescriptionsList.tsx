'use client';

import Pagination from "@/components/pagination/pagination";
import { SELECTORS } from "@/constants/selectors";
import { PaginationType, PrescriptionType, PrescriptionsType } from "@/ts/types";
import { scrollToElement } from "@/utils/utils";
import { Card, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PrescriptionLink from "../prescriptionLink/prescriptionLink";

type Props = {
    prescriptions: PrescriptionsType,
    pagination?: PaginationType
}

const PrescriptionsList = (props: Props) => {
    const [prescriptions, setPrescriptions] = useState<PrescriptionsType>(props?.prescriptions || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);

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
            {
                prescriptions?.map((prescription: PrescriptionType) => {
                    return (
                        <PrescriptionLink prescription={prescription} key={uuid()}></PrescriptionLink>
                    )
                })
            }

            <Pagination pagination={pagination} url='health-tests' onDataLoad={onDataLoad} />
        </>
    )
}

export default PrescriptionsList;