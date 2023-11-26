'use client';

import PaginationServices from "../../services/paginationServices/paginationServices";

import { useState } from "react";
import { PaginationType } from "../../ts/types";
import { copyObject } from "../../utils/utils";

const PaginationLogic = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const paginationServices = PaginationServices();

    /**
     * Change page
     * 
     * @param direction string -- '< Back' or 'Next >' page to load 
     * @param pagination PaginationType 
     * @param page number -- Jump to page
     * 
     * @returns data from API or empty object
     */
    const changePage = async (url: string, direction: string, pagination: PaginationType, page?: number) => {
        if (isLoading) return;
        setIsLoading(true);

        const paginationCopy = copyObject(pagination);
        let pageToLoad = 0;

        if (direction == '>' && paginationCopy.current_page++ <= paginationCopy.last_page) {
            pageToLoad = paginationCopy.current_page++;
        }

        if (direction == '<' && paginationCopy.current_page-- >= 1) {
            pageToLoad = paginationCopy.current_page--;
        }

        if (!pageToLoad) return;

        const response = await paginationServices.load(url, pageToLoad);

        if (response) {
            setIsLoading(false);

            return response;
        } else {
            setIsLoading(false);

            return {};
        }
    }

    return {
        changePage,
        isLoading,
    }

}

export default PaginationLogic;