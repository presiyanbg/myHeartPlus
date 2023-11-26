'use client';
import UserDailyStatistics from "../user/userDailyStatistics/userDailyStatistics";
import ArticlesListSmall from "../articles/articlesList/articlesListSmall";

import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { ArticlesType, DoctorsType } from "@/ts/types";

type Props = {
    bodyData?: ArticlesType | DoctorsType,
    bodyDataType?: 'articles' | 'doctors'
}

const SidePanel = async (props: Props) => {
    return (
        <Card className="w-full">
            <CardHeader className="w-full">
                <UserDailyStatistics></UserDailyStatistics>
            </CardHeader>

            <Divider />

            <CardBody>
                {/* Articles */}
                {
                    props?.bodyDataType == 'articles' &&
                    props?.bodyData != undefined &&
                    <ArticlesListSmall articles={props?.bodyData as ArticlesType} />
                }
            </CardBody>

            <Divider />

            <CardFooter>
                exercise of the day
            </CardFooter>
        </Card>
    )
}

export default SidePanel;