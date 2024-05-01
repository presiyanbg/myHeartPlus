import DoctorsList from "@/components/doctors/doctorsList/doctorsList";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import SidePanel from "@/components/sidePanel/sidePanel";
import DoctorsServices from "@/services/doctorsServices/doctorsServices";
import { SELECTORS } from "@/constants/selectors";
import { DoctorsType, PaginationType } from "@/ts/types";
import { unstable_setRequestLocale } from 'next-intl/server';

const DoctorsPage = async ({ params: { locale } }: { params: { locale: any } }) => {
    unstable_setRequestLocale(locale);

    const data: any = await DoctorsServices().doctorsList();
    const doctors: DoctorsType = await data?.doctors?.data || [];
    const pagination: PaginationType = await data?.doctors || [];

    return (
        <PageLayout>
            <div className={'gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0 ' + SELECTORS.anchorScroll} >
                <div className="lg:col-span-4">
                    <DoctorsList doctors={doctors} pagination={pagination} />
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={doctors} bodyDataType={'doctors'}></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default DoctorsPage;