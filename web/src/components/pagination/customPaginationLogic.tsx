import { PaginationType } from "../../ts/types";
import PaginationServices from "../../services/paginationServices/paginationServices";


const CustomPaginationLogic = () => {
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
    let pageToLoad = 0;

    if (direction == '>' && pagination.current_page++ <= pagination.last_page) {
      pageToLoad = pagination.current_page++;
    }

    if (direction == '<' && pagination.current_page-- >= 1) {
      pageToLoad = pagination.current_page--;
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

export default CustomPaginationLogic;