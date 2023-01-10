import ArticleServices from "../../services/articlesServices/articlesServices";

const ArticleLogic = () => {
  const articlesServices = ArticleServices();


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