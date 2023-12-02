import DoctorView from "@/components/doctors/doctorView/doctorView";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import SidePanel from "@/components/sidePanel/sidePanel";
import DoctorsServices from "@/services/doctorsServices/doctorsServices";

import { DoctorType, HealthTestsType, PrescriptionsType } from "@/ts/types";
import { Card, CardHeader } from "@nextui-org/react";

type Props = {
    params: {
        id: number
    }
}

const DoctorPage = async (props: Props) => {
    const doctorData: any = await DoctorsServices().doctorShow(props?.params?.id);
    const doctor: DoctorType = await doctorData?.doctor || {};

    const prescriptionsData: any = await DoctorsServices().doctorShowPrescriptions(props?.params?.id);
    const prescriptions: PrescriptionsType = await prescriptionsData?.data || {};

    const testsData: any = await DoctorsServices().doctorShowHealthTests(props?.params?.id);
    const tests: HealthTestsType = await testsData?.data || {};

    return (
        <PageLayout>
            <div className="px-3 lg:px-0 pb-1 lg:pb-4">
                <Card>
                    <CardHeader>
                        <PageTitle
                            title={doctor.full_name}
                            breadCrumbs={[
                                { url: "/doctors", title: 'Doctors' }
                            ]}
                        ></PageTitle>
                    </CardHeader>
                </Card>
            </div>

            <div className="gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0">
                <div className="lg:col-span-4 pb-4 lg:pb-0">
                    <DoctorView
                        doctor={doctor}
                        prescriptions={prescriptions}
                        healthTests={tests}>
                    </DoctorView>
                </div>

                <div className="lg:col-span-2">
                    <SidePanel></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default DoctorPage;