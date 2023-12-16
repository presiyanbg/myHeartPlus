'use client';

import HealthTestLink from "../healthTestLink/healthTestLink";
import Pagination from "@/components/pagination/pagination";

import { v4 as uuid } from 'uuid';
import { HealthTestType, HealthTestsType, PaginationType } from "../../../ts/types";
import { useState } from "react";
import { scrollToElement } from "@/utils/utils";
import { SELECTORS } from "@/constants/selectors";
import { useTranslations } from "next-intl";
import Filter from "@/components/common/filter/filter";

type Props = {
    healthTests?: HealthTestsType,
    pagination?: PaginationType
}

const HealthTestsList = (props: Props) => {
    const [tests, setTests] = useState<HealthTestsType>(props?.healthTests || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);
    const t = useTranslations();

    if (!tests) return (<></>);

    /**
         * Load tests data
         * 
         * @param data PaginationType data 
         * @param autoScroll boolean -- Used on page change 
         */
    const onDataLoad = (data: any, autoScroll: boolean = false): void => {
        if (!data?.healthTests?.data) return;

        setTests(data.healthTests.data);
        setPagination(data.healthTests);
        autoScroll && scrollToElement(`.${SELECTORS.anchorScroll}`);
    }

    return (
        <>
            <Filter title={t('Health checks')}></Filter>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pb-5">
                {
                    tests.map((test: HealthTestType) => {
                        return (<HealthTestLink test={test} key={uuid()}></HealthTestLink>);
                    })
                }
            </div>

            <Pagination pagination={pagination} url='health-tests' onDataLoad={onDataLoad}></Pagination>
        </>
    )
}

export default HealthTestsList;