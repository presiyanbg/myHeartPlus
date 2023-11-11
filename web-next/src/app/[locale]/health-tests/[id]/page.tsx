'use client';
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import { HealthTestType } from "@/ts/types";

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
            <PageTitle title={test.title}
                breadCrumbs={[
                    { url: "/", title: 'Health checks' }
                ]}
            ></PageTitle>

            {/* Article content */}
            <div className="row mb-3">
                <div className="col-8">
                    <div className="col-12">
                        {test?.description}
                    </div>
                </div>

                {/* Small side news */}
                <div className="col-4">
                    {/* <NewsSmall singleComponent={true}></NewsSmall> */}
                </div>
            </div>
        </PageLayout>
    )
}

export default HealthTestPage;