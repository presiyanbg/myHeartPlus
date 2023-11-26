import ArticleServices from "@/services/articlesServices/articlesServices"
import ArticlesList from '../../components/articles/articlesList/articlesList';
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import ArticlesTop from "@/components/articles/articlesTop/articlesTop";
import SidePanel from "@/components/sidePanel/sidePanel";

import { ArticlesType, PaginationType } from '../../ts/types';
import { SELECTORS } from "@/constants/selectors";

const Home = async () => {
    const data: any = await ArticleServices().articlesList();
    const articles: ArticlesType = await data?.articles?.data || [];
    const pagination: PaginationType = await data?.articles || [];

    return (
        <>
            <ArticlesTop articles={articles}></ArticlesTop>

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

export default Home;
