import HealthTestsList from "@/components/healthTest/healthTestsList/healthTestsList";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import SidePanel from "@/components/sidePanel/sidePanel";
import { SELECTORS } from "@/constants/selectors";
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import { HealthTestsType, PaginationType } from "@/ts/types";
import { unstable_setRequestLocale } from 'next-intl/server';

const HealthTestsPage = async ({ params: { locale } }: { params: { locale: any } }) => {
    unstable_setRequestLocale(locale);

    const data: any = await HealthTestsServices().healthTestsList();
    const healthTests: HealthTestsType = await data?.tests?.data || [];
    const pagination: PaginationType = await data?.tests || [];

    return (
        <PageLayout>
            <div className={'gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0 ' + SELECTORS.anchorScroll} >
                <div className="lg:col-span-4">
                    <HealthTestsList healthTests={healthTests} pagination={pagination} />
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={healthTests} bodyDataType={'healthTests'}></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default HealthTestsPage;