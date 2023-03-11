import ArticleServices from "../../services/articlesServices/articlesServices";
import PaginationServices from "../../services/paginationServices/paginationServices";

const HomeLogic = () => {
  const articlesServices = ArticleServices();

  /**
   * Load articles from API -- Using default service
   * 
   * @returns Articles array from API
   */
  const loadArticles = async () => {
    const response = await articlesServices.articles();

    if (response) {
      return response;
    } {
      return {};
    }
  }

  return {
    loadArticles,
  }
}

export default HomeLogic;