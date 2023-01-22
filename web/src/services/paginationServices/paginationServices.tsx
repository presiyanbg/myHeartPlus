
import Api from "../../api/api";

const PaginationServices = () => {
  const api = Api();

  /**
   * Load
   * 
   * @param url string -- API url to load, example 'articles'
   * @param page number 
   * @returns API response
   */
  const load = (url: string, page: number) => {
    // Build url to prevent using plain urls that are not to the API
    const buildUrl = `/${url}?page=${page}`;

    return api.post(buildUrl, undefined, false, false);
  }

  return {
    load,
  }
}

export default PaginationServices;