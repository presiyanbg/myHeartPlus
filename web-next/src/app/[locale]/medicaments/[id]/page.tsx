import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import MedicamentsServices from "@/services/medicamentsServices/medicamentsServices";
import { MedicamentType } from "@/ts/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type Props = {
    params: {
        id: number
    }
}

const MedicamentPage = async (props: Props) => {
    const data: any = await MedicamentsServices().medicamentShow(props?.params?.id);
    const medicament: MedicamentType = await data?.medicament || {};

    return (
        <PageLayout>
            <Card>
                <CardHeader>
                    <PageTitle
                        title={medicament.title}
                        breadCrumbs={[
                            { url: "/medicaments", title: 'Medicaments' }
                        ]}
                    ></PageTitle>
                </CardHeader>

                <Divider></Divider>

                <CardBody>
                    {medicament?.description}
                </CardBody>
            </Card>
        </PageLayout>
    )
}

export default MedicamentPage;