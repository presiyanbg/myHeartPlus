import ArticleStatistics from "@/components/articles/articleParts/articleStatistics";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import SidePanel from "@/components/sidePanel/sidePanel";
import ArticleServices from "@/services/articlesServices/articlesServices";

import { ArticleType, ArticlesType, UserType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Avatar, Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

type Props = {
    params: {
        id: number
    }
}

const ArticlePage = async (props: Props) => {
    // Load main article data
    const data: any = await ArticleServices().articleSelect(props?.params?.id);
    const article: ArticleType = await data?.article || {};
    const articleHTML: any = await data?.page || {};
    const writer: UserType = await data?.writer || {};

    // Update main article views
    const updateViews: any = await ArticleServices().articlesUpdateViews(props?.params?.id);

    // Load top articles for side panel
    const sidePanelData: any = await ArticleServices().articlesListTopViews();
    const articles: ArticlesType = await sidePanelData?.articles?.data || [];

    return (
        <PageLayout>
            <div className="gap-4 flex-col lg:grid lg:grid-cols-6 px-3 lg:px-0">
                <div className="lg:col-span-4">
                    <Card>
                        <CardBody>
                            <PageTitle title={article.title}
                                breadCrumbs={[
                                    { url: "/", title: 'Home' }
                                ]}
                            ></PageTitle>
                        </CardBody>
                    </Card>

                    <div className="py-3"></div>

                    <Card>
                        <CardHeader>
                            <div className="flex flex-col w-full">
                                {/* Title */}
                                <h1 className="text-3xl pb-3">{article?.title}</h1>

                                <div className="flex flex-wrap justify-between items-center text-gray-600">
                                    {/* Author */}
                                    <span className="pr-2">
                                        <Link href={`/users/${writer?.id}`}
                                            className="flex gap-4 items-center hover:text-blue-500">
                                            <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}/${writer?.image}`} size="sm" />

                                            {writer?.full_name}
                                        </Link>
                                    </span>


                                    {/* Date created */}
                                    <span>
                                        {parseDateAndTime(article.created_at)}
                                    </span>

                                    {/* Statistics */}
                                    <span className="w-full sm:w-auto text-small flex gap-4 pt-4 sm:pt-0">
                                        <ArticleStatistics article={article}></ArticleStatistics>
                                    </span>
                                </div>
                            </div>
                        </CardHeader>

                        <Divider></Divider>

                        <CardBody>
                            {/* Article image */}
                            <Image
                                isZoomed
                                width={1200}
                                className="h-96 w-full"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                alt={article.title} />

                            {/* Article content */}
                            <div className="pt-6 py-3 article-content">
                                <div dangerouslySetInnerHTML={{ __html: articleHTML }}></div>
                            </div>


                            {/* Writer */}
                            {
                                !!(writer?.id > 0) && (
                                    <>
                                        <Divider></Divider>


                                    </>
                                )
                            }

                            {/* Article comments */}
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    {/* <Comments parentUrl="article" parentId={id}></Comments> */}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={articles} bodyDataType={'articles'}></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default ArticlePage;