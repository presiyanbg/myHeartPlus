import ArticleServices from "@/services/articlesServices/articlesServices"
import ArticlesList from '../../components/articles/articlesList/articlesList';
import { ArticlesType, PaginationType } from '../../ts/types';

const Home = async () => {
    const data: any = await ArticleServices().articlesList();
    const articles: ArticlesType = await data?.articles?.data || [];
    const pagination: PaginationType = await data?.articles || [];

    return (
        <div>
            <ArticlesList articles={articles} pagination={pagination}></ArticlesList>
        </div>
    )
}

export default Home;
