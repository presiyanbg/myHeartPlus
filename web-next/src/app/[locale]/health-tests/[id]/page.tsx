import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import { HealthTestType } from "@/ts/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type Props = {
    params: {
        id: number
    }
}

const HealthTestPage = async (props: Props) => {
    const data: any = await HealthTestsServices().healthTestShow(props?.params?.id);
    const test: HealthTestType = await data?.test || {};

    return (
        <PageLayout>
            <Card>
                <CardHeader>
                    <PageTitle
                        title={test.title}
                        breadCrumbs={[
                            { url: "/health-tests", title: 'Health checks' }
                        ]}
                    ></PageTitle>
                </CardHeader>

                <Divider></Divider>

                <CardBody>
                    {test?.description}
                </CardBody>
            </Card>
        </PageLayout>
    )
}

export default HealthTestPage;