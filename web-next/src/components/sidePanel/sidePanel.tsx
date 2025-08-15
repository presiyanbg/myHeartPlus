'use client';
import UserDailyStatistics from "../user/userComponents/userDailyStatistics/userDailyStatistics";

import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { ArticleType, ArticlesType, DoctorsType, HealthTestType, HealthTestsType } from "@/ts/types";
import SidePanelSmallList from "./sidePanelSmallList";
import SidePanelLogic from "./sidePanelLogic";

type Props = {
    bodyData?: ArticlesType | DoctorsType | HealthTestsType | any,
    bodyDataType?: 'articles' | 'doctors' | 'healthTests' | 'prescriptions' | 'medicaments',
}

const SidePanel = (props: Props) => {
    const logic = SidePanelLogic();
    const data = logic.formatBodyData(props.bodyDataType || '', props.bodyData);

    return (
        <Card className="w-full">
            <CardHeader className="w-full">
                <UserDailyStatistics></UserDailyStatistics>
            </CardHeader>

            <Divider />

            <CardBody>
                {/* Data list */}
                <SidePanelSmallList title={data?.title} data={data?.content} url={data?.url} />
            </CardBody>

            <Divider />

            <CardFooter>
                exercise of the day
            </CardFooter>
        </Card>
    )
}

export default SidePanel;