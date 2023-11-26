'use client';

import Pagination from "@/components/pagination/pagination";
import { SELECTORS } from "@/constants/selectors";
import { PaginationType, PrescriptionType, DoctorsType, DoctorType } from "@/ts/types";
import { scrollToElement } from "@/utils/utils";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import DoctorLink from "../doctorLink/doctorLink";

type Props = {
    doctors: DoctorsType,
    pagination?: PaginationType
}

const DoctorsList = (props: Props) => {
    const [doctors, setDoctors] = useState<DoctorsType>(props?.doctors || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);

    if (!doctors) return (<></>);

    /**
         * Load tests data
         * 
         * @param data PaginationType data 
         * @param autoScroll boolean -- Used on page change 
         */
    const onDataLoad = (data: any, autoScroll: boolean = false): void => {
        if (!data?.doctors?.data) return;

        setDoctors(data.doctors.data);
        setPagination(data.doctors);
        autoScroll && scrollToElement(`.${SELECTORS.anchorScroll}`);
    }

    return (
        <>
            {
                doctors?.map((doctor: DoctorType) => {
                    return (
                        <DoctorLink doctor={doctor} key={uuid()}></DoctorLink>
                    )
                })
            }

            <Pagination pagination={pagination} url='health-tests' onDataLoad={onDataLoad} />
        </>
    )
}

export default DoctorsList;