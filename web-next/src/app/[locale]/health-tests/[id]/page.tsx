import PageDescription from "@/components/common/pageDescription/pageDescription";
import HealthTestQuizAndResult from "@/components/healthTest/healthTestQuizAndResult/healthTestQuizAndResult";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import { HealthTestQuestionsType, HealthTestType } from "@/ts/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const HealthTestPage = async ({
    params,
}: {
    params: Promise<{ id: number }>
}) => {
    const { id } = await params;

    const data: any = await HealthTestsServices().healthTestShow(id);
    const test: HealthTestType = await data?.test || {};
    const testQA: HealthTestQuestionsType = await data?.testQA || {};

    if (!test?.title?.length) return (<></>);

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
                    <PageDescription title={test.title}
                        description={test.description}
                        rating={test.rating}
                        created_at={test.created_at}
                        category={test.category} />
                </CardBody>
            </Card>

            <div className="py-3"></div>

            {
                !!(testQA?.length) && (
                    <HealthTestQuizAndResult test={test} testQA={testQA}></HealthTestQuizAndResult>
                )
            }
        </PageLayout>
    )
}

export default HealthTestPage;