import UserDailyStatistics from "../user/userDailyStatistics/userDailyStatistics";
import ArticlesListSmall from "../articles/articlesList/articlesListSmall";
import ArticleServices from "@/services/articlesServices/articlesServices";

import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { ArticlesType } from "@/ts/types";

const SidePanel = async () => {
    const data: any = await ArticleServices().articlesList();
    const articles: ArticlesType = await data?.articles?.data || [];

    return (
        <Card className="w-full">
            <CardHeader className="w-full">
                <UserDailyStatistics></UserDailyStatistics>
            </CardHeader>

            <Divider />

            <CardBody>
                <ArticlesListSmall articles={articles} />
            </CardBody>

            <Divider />

            <CardFooter>
                exercise of the day
            </CardFooter>
        </Card>
    )
}

export default SidePanel;