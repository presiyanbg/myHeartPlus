import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import DoctorsServices from "@/services/doctorsServices/doctorsServices";
import { DoctorType } from "@/ts/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type Props = {
    params: {
        id: number
    }
}

const DoctorPage = async (props: Props) => {
    const data: any = await DoctorsServices().doctorShow(props?.params?.id);
    const doctor: DoctorType = await data?.doctor || {};

    return (
        <PageLayout>
            <Card>
                <CardHeader>
                    <PageTitle
                        title={doctor.full_name}
                        breadCrumbs={[
                            { url: "/doctors", title: 'Doctors' }
                        ]}
                    ></PageTitle>
                </CardHeader>

                <Divider></Divider>

                <CardBody>
                    {doctor?.description}
                </CardBody>
            </Card>
        </PageLayout>
    )
}

export default DoctorPage;