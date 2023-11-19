import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import SidePanel from "@/components/sidePanel/sidePanel";
import ArticleServices from "@/services/articlesServices/articlesServices";
import { ArticleType } from "@/ts/types";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

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
        <PageLayout>
            <div className="gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0">
                <div className="lg:col-span-4">
                    <Card>
                        <CardHeader className="pb-0">
                            <PageTitle title={article.title}
                                breadCrumbs={[
                                    { url: "/", title: t('Home') }
                                ]}
                            ></PageTitle>
                        </CardHeader>

                        <CardBody className="pt-0">
                            {/* Article image */}
                            <Image
                                isZoomed
                                width={1200}
                                className="h-96 w-full"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                alt={article.title} />

                            {/* Article content */}
                            <div className="py-3">
                                <div dangerouslySetInnerHTML={{ __html: articleHTML }}></div>
                            </div>

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
                    <SidePanel></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default ArticlePage;