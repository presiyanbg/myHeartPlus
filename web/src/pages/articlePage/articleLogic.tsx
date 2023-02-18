import ArticleServices from "../../services/articlesServices/articlesServices";

const ArticleLogic = () => {
  const articlesServices = ArticleServices();


  /**
   * Load article data
   * 
   * @param articleId ID of article
   * @returns API response
   */
  const loadArticle = async (articleId: string | number) => {
    articleId = Number(articleId);

    const data = await articlesServices.articleShow(articleId);

    return data;
  }

  return {
    loadArticle
  }
}

export default ArticleLogic;