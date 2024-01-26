import Api from "../../api/serverApi";

const ArticleServices = () => {
    const api = Api();

    const articlesList = async (locale: string, page: number = 1) => {
        return api.get(`/articles?page=${page}&locale=${locale}`, undefined, true);
    }

    const articleSelect = async (locale: string = '', id: number,) => {
        return api.get(`/articles/view/${id}/${locale}`, undefined, true);
    }

    const articlesListTopViews = async (locale: string, page: number = 1) => {
        return api.get(`/articles/top?page=${page}&locale=${locale}`, undefined, true);
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