import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import ArticleServices from "@/services/articlesServices/articlesServices";
import { ArticleType } from "@/ts/types";
import Image from "next/image";

type Props = {
    params: {
        id: number
    }
}

const ArticlePage = async (props: Props) => {
    const data: any = await ArticleServices().articleSelect(props?.params?.id);
    const article: ArticleType = await data?.article || {};
    const articleHTML: any = await data?.page || {};

    const t = (text: string) => {
        return text;
    }

    return (
        <>
            <PageTitle title={article.title}
                breadCrumbs={[
                    { url: "/", title: t('Home') }
                ]}
            ></PageTitle>

            <div className="row mb-3">
                <div className="col-8">
                    <div className="col-12">
                        {/* Article image */}
                        <div className="article__image">
                            <Image
                                className="h-96"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                alt={article.title}
                                width={500}
                                height={100} />
                        </div>

                        {/* Article content */}
                        <div className="col-12">
                            <div dangerouslySetInnerHTML={{ __html: articleHTML }}></div>
                        </div>
                    </div>
                </div>

                {/* Small side news */}
                <div className="col-4">
                    {/* <NewsSmall singleComponent={true}></NewsSmall> */}
                </div>
            </div>

            {/* Article comments */}
            <div className="row mb-3">
                <div className="col-sm-12">
                    {/* <Comments parentUrl="article" parentId={id}></Comments> */}
                </div>
            </div>
        </>
    )
}

export default ArticlePage;