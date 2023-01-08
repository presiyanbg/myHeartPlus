import Api from "../../api/api";

const ArticleServices = () => {
  const api = Api();

  const articles = () => {
    return api.post('/articles', undefined, false);
  }

  return {
    articles,
  }
}

export default ArticleServices;