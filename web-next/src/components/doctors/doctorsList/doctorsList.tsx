'use client';

import Pagination from "@/components/pagination/pagination";
import { SELECTORS } from "@/constants/selectors";
import { PaginationType, PrescriptionType, DoctorsType, DoctorType } from "@/ts/types";
import { scrollToElement } from "@/utils/utils";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import DoctorLink from "../doctorLink/doctorLink";
import Filter from "@/components/common/filter/filter";
import { useTranslations } from "next-intl";

type Props = {
    doctors: DoctorsType,
    pagination?: PaginationType
}

const DoctorsList = (props: Props) => {
    const [doctors, setDoctors] = useState<DoctorsType>(props?.doctors || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);
    const t = useTranslations();

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
            <Filter title={t('Doctors')}></Filter>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 pb-5">
                {
                    doctors?.map((doctor: DoctorType) => {
                        return (
                            <DoctorLink doctor={doctor} key={uuid()}></DoctorLink>
                        )
                    })
                }
            </div>

            <Pagination pagination={pagination} url='doctors' onDataLoad={onDataLoad} />
        </>
    )
}

export default DoctorsList;