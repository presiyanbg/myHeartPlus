import HealthTestsList from "@/components/healthTest/healthTestsList/healthTestsList";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import { HealthTestsType, PaginationType } from "@/ts/types";

const HealthTestsPage = async () => {
    const data: any = await HealthTestsServices().healthTestsList();
    const healthTests: HealthTestsType = await data?.tests?.data || [];

    return (
        <PageLayout>
            <HealthTestsList healthTests={healthTests} />
        </PageLayout>
    )
}

export default HealthTestsPage;