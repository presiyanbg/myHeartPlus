'use client';

import Pagination from "@/components/pagination/pagination";
import { SELECTORS } from "@/constants/selectors";
import { PaginationType, PrescriptionType, MedicamentsType, MedicamentType } from "@/ts/types";
import { scrollToElement } from "@/utils/utils";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import MedicamentLink from "../medicamentLink/medicamentsLink";

type Props = {
    medicaments: MedicamentsType,
    pagination?: PaginationType
}

const MedicamentsList = (props: Props) => {
    const [medicaments, setMedicaments] = useState<MedicamentsType>(props?.medicaments || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);

    if (!medicaments) return (<></>);

    /**
         * Load tests data
         * 
         * @param data PaginationType data 
         * @param autoScroll boolean -- Used on page change 
         */
    const onDataLoad = (data: any, autoScroll: boolean = false): void => {
        if (!data?.medicaments?.data) return;

        setMedicaments(data.medicaments.data);
        setPagination(data.medicaments);
        autoScroll && scrollToElement(`.${SELECTORS.anchorScroll}`);
    }

    return (
        <>
            {
                medicaments?.map((medicament: MedicamentType) => {
                    return (
                        <MedicamentLink medicament={medicament} key={uuid()}></MedicamentLink>
                    )
                })
            }

            <Pagination pagination={pagination} url='health-tests' onDataLoad={onDataLoad} />
        </>
    )
}

export default MedicamentsList;