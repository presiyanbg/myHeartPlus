import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PrescriptionsList from "@/components/prescriptions/prescriptionsList/prescriptionsList";
import SidePanel from "@/components/sidePanel/sidePanel";
import PrescriptionsServices from "@/services/prescriptionsServices/prescriptionsServices";
import { SELECTORS } from "@/constants/selectors";
import { PaginationType, PrescriptionsType } from "@/ts/types";
import { unstable_setRequestLocale } from 'next-intl/server';

const PrescriptionsPage = async ({ params: { locale } }: { params: { locale: any } }) => {
    unstable_setRequestLocale(locale);

    const data: any = await PrescriptionsServices().prescriptionsList();
    const prescriptions: PrescriptionsType = await data?.prescriptions?.data || [];
    const pagination: PaginationType = await data?.prescriptions || [];

    return (
        <PageLayout>
            <div className={'gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0 ' + SELECTORS.anchorScroll} >
                <div className="lg:col-span-4">
                    <PrescriptionsList prescriptions={prescriptions} pagination={pagination} />
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={prescriptions} bodyDataType={'prescriptions'}></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default PrescriptionsPage;