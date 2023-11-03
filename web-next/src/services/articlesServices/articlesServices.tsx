import Api from "../../api/api";

const ArticleServices = () => {
    const api = Api();

    const articlesList = async (page: number = 1) => {
        return api.post(`/articles?page=${page}`, undefined, false);
    }

    const articleSelect = async (id: number) => {
        return api.post(`/articles/view/${id}`, undefined, false);
    }

    return {
        articlesList,
        articleSelect,
    }
}

export default ArticleServices;