import Api from "../../api/api";

const ArticleServices = () => {
  const api = Api();

  const articles = (page: number = 1) => {
    return api.post(`/articles?page=${page}`, undefined, false);
  }

  return {
    articles,
  }
}

export default ArticleServices;