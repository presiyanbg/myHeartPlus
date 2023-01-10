import Api from "../../api/api";

const ArticleServices = () => {
  const api = Api();

  const articles = (page: number = 1) => {
    return api.post(`/articles?page=${page}`, undefined, false);
  }

  const articleShow = (id: number) => {
    return api.post(`/articles/view/${id}`, undefined, false);
  }

  return {
    articles,
    articleShow,
  }
}

export default ArticleServices;