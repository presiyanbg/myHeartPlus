import ArticleServices from "../../services/articlesServices/articlesServices";

const HomeLogic = () => {
  const articlesServices = ArticleServices();

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

export default HomeLogic;