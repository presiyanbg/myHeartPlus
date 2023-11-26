import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import MedicamentsList from "@/components/medicaments/medicamentsList/medicamentsList";
import PrescriptionsList from "@/components/prescriptions/prescriptionsList/prescriptionsList";
import SidePanel from "@/components/sidePanel/sidePanel";
import { SELECTORS } from "@/constants/selectors";
import MedicamentsServices from "@/services/medicamentsServices/medicamentsServices";
import PrescriptionsServices from "@/services/prescriptionsServices/prescriptionsServices";
import { MedicamentsType, PaginationType, PrescriptionsType } from "@/ts/types";

const MedicamentsPage = async () => {
    const data: any = await MedicamentsServices().medicamentsList();
    const medicaments: MedicamentsType = await data?.medicaments?.data || [];
    const pagination: PaginationType = await data?.medicaments || [];

    return (
        <PageLayout>
            <div className={'gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0 ' + SELECTORS.anchorScroll} >
                <div className="lg:col-span-4">
                    <MedicamentsList medicaments={medicaments} pagination={pagination} />
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={medicaments} bodyDataType={'medicaments'}></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default MedicamentsPage;