import ArticleServices from "../../services/articlesServices/articlesServices";

const NewsLogic = () => {
  const articlesServices = ArticleServices();

  /**
   * Load articles from API
   * 
   * @returns Articles array
   */
  const loadArticles = async () => {
    const response = await articlesServices.articles();

    if (response.articles && response.articles.data) {
      return response.articles.data;
    } else {
      return [];
    }
  }

  return {
    loadArticles
  }
}

export default NewsLogic;