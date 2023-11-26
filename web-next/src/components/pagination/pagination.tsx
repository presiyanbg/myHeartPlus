'use client';
import PaginationLogic from './paginationLogic';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationType } from '../../ts/types';
import { Button, Tooltip } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { copyObject } from "../../utils/utils";

type Props = {
    url: string,
    pagination: PaginationType | undefined,
    onDataLoad: (data: PaginationType, autoScroll?: boolean) => any
}

const Pagination = (props: Props) => {
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination as PaginationType);
    const logic = PaginationLogic();
    const t = useTranslations();

    /**
     * Handle click
     * 
     * @param type string -- Function to call
     * @param data any -- Data for function 
     */
    const handleClick = (type: string, data?: any) => {
        switch (type) {
            case 'changePage':
                if (data && pagination && props.url) {
                    logic.changePage(props.url, data, pagination).then(response => {
                        props.onDataLoad(response, true)
                    });
                }
                break;

            default:
                break;
        }
    }

    /**
     * Load pagination
     */
    useEffect(() => {
        props.pagination && setPagination(copyObject(props.pagination));
    }, [props]);

    // Check for missing data
    if (!pagination || !pagination?.current_page) {
        return (<></>);
    }

    return (
        <div className="flex pb-7">
            {/* Back button */}
            {/* Show back button only when current page is not the first one */}
            <Button
                isDisabled={!(pagination?.current_page > 1)}
                size="sm"
                color="secondary"
                variant="bordered"
                onClick={() => handleClick('changePage', '<')}>
                <Tooltip content={t('Back')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Tooltip>
            </Button>

            {/* Current page */}
            <div className="px-3">
                <Button color="secondary" size="sm">
                    {pagination?.current_page}
                </Button>
            </div>

            {/* Next button */}
            <Button
                isDisabled={!pagination?.next_page_url}
                color="secondary"
                variant="bordered"
                size="sm"
                onClick={() => handleClick('changePage', '>')}>

                <Tooltip content={t('Next+Page')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Tooltip>
            </Button>
        </div>
    )
}

export default Pagination;