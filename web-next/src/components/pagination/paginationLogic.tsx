'use client';

import PaginationServices from "../../services/paginationServices/paginationServices";

import { PaginationType } from "../../ts/types";
import { copyObject } from "../../utils/utils";

const PaginationLogic = () => {
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
            return response;
        } else {
            return {};
        }
    }

    return {
        changePage,
    }

}

export default PaginationLogic;