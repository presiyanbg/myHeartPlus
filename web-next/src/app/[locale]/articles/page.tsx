import ArticleServices from "@/services/articlesServices/articlesServices"
import ArticlesList from '../../../components/articles/articlesList/articlesList';
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import ArticlesTop from "@/components/articles/articlesTop/articlesTop";
import SidePanel from "@/components/sidePanel/sidePanel";

import { ArticlesType, PaginationType } from '../../../ts/types';
import { SELECTORS } from "@/constants/selectors";

const ArticlesPage = async ({ params: { locale } }: { params: { locale: any } }) => {
    let data: any;
    let articles: ArticlesType = [] as ArticlesType;
    let pagination: PaginationType = {} as PaginationType;

    let dataTopArticles: any;
    let topArticles: any;

    try {
        data = await ArticleServices().articlesList(locale);
        articles = await data?.articles?.data || [];
        pagination = await data?.articles || [];

        dataTopArticles = await ArticleServices().articlesListTopViews(locale);
        topArticles = await dataTopArticles?.articles?.data || [];
    } catch (ex) {
        console.error(ex);
    }

    return (
        <>
            <ArticlesTop articles={topArticles}></ArticlesTop>

            <PageLayout>
                <div className={'gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0 ' + SELECTORS.anchorScroll} >
                    <div className="lg:col-span-4">
                        <ArticlesList articles={articles} pagination={pagination}></ArticlesList>
                    </div>

                    <div className="lg:col-span-2">
                        <SidePanel bodyData={articles} bodyDataType={'articles'}></SidePanel>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default ArticlesPage;