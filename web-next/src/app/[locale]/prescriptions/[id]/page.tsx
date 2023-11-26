import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import PrescriptionsServices from "@/services/prescriptionsServices/prescriptionsServices";
import { PrescriptionType } from "@/ts/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type Props = {
    params: {
        id: number
    }
}

const PrescriptionPage = async (props: Props) => {
    const data: any = await PrescriptionsServices().prescriptionShow(props?.params?.id);
    const prescription: PrescriptionType = await data?.prescription || {};

    console.log(data)
    console.log(prescription)

    return (
        <PageLayout>
            <Card>
                <CardHeader>
                    <PageTitle
                        title={prescription.title}
                        breadCrumbs={[
                            { url: "/prescriptions", title: 'Health checks' }
                        ]}
                    ></PageTitle>
                </CardHeader>

                <Divider></Divider>

                <CardBody>
                    {prescription?.description}
                </CardBody>
            </Card>
        </PageLayout>
    )
}

export default PrescriptionPage;