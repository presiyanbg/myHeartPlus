import HealthTestQuizAndResult from "@/components/healthTest/healthTestQuizAndResult/healthTestQuizAndResult";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import { HealthTestQuestionsType, HealthTestType } from "@/ts/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type Props = {
    params: {
        id: number
    }
}

const HealthTestPage = async (props: Props) => {
    const data: any = await HealthTestsServices().healthTestShow(props?.params?.id);
    const test: HealthTestType = await data?.test || {};
    const testQA: HealthTestQuestionsType = await data?.testQA || {};

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

            <div className="py-3"></div>

            <Card>
                <CardBody>
                    {
                        !!(testQA?.length) && (
                            <HealthTestQuizAndResult test={test} testQA={testQA}></HealthTestQuizAndResult>
                        )
                    }
                </CardBody>
            </Card>
        </PageLayout>
    )
}

export default HealthTestPage;