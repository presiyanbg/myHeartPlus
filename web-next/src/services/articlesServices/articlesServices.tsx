import Api from "../../api/serverApi";

const ArticleServices = () => {
    const api = Api();

    const articlesList = async (page: number = 1) => {
        return api.post(`/articles?page=${page}`, undefined, true);
    }

    const articleSelect = async (id: number) => {
        return api.post(`/articles/view/${id}`, undefined, true);
    }

    const articlesListTopViews = async (page: number = 1) => {
        return api.post(`/articles/top?page=${page}`, undefined, true);
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