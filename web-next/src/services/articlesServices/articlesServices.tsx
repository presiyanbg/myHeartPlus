import Api from "../../api/serverApi";

const ArticleServices = () => {
    const api = Api();

    const articlesList = async (page: number = 1) => {
        return api.get(`/articles?page=${page}`, undefined, true);
    }

    const articleSelect = async (id: number,) => {
        return api.get(`/articles/${id}`, undefined, true);
    }

    const articlesListTopViews = async (page: number = 1) => {
        return api.get(`/articles?page=${page}&top=true`, undefined, true);
    }

    const articlesUpdateViews = async (id: number) => {
        return api.post(`/articles/updateViews/${id}`, undefined, false);
    }

    return {
        articlesList,
        articleSelect,
        articlesListTopViews,
        articlesUpdateViews,
    }
}

export default ArticleServices;