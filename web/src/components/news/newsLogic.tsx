import ArticleServices from "../../services/articlesServices/articlesServices";

const NewsLogic = () => {
  const articlesServices = ArticleServices();

  const loadArticles = async () => {
    console.log('load articles')

    const response = await articlesServices.articles();

    if (response.articles && response.articles.data) {
      console.log(response)

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