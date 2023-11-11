import ArticleServices from "@/services/articlesServices/articlesServices"
import ArticlesList from '../../components/articles/articlesList/articlesList';
import { ArticlesType, PaginationType } from '../../ts/types';
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import ArticlesTop from "@/components/articles/articlesTop/articlesTop";

const Home = async () => {
    const data: any = await ArticleServices().articlesList();
    const articles: ArticlesType = await data?.articles?.data || [];
    const pagination: PaginationType = await data?.articles || [];

    return (
        <>
            <ArticlesTop articles={articles}></ArticlesTop>

            <PageLayout>
                <ArticlesList articles={articles} pagination={pagination}></ArticlesList>
            </PageLayout>
        </>
    )
}

export default Home;
