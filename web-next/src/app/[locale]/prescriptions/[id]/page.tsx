import PageDescription from "@/components/common/pageDescription/pageDescription";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import MedicamentLink from "@/components/medicaments/medicamentLink/medicamentsLink";
import SidePanel from "@/components/sidePanel/sidePanel";
import PrescriptionsServices from "@/services/prescriptionsServices/prescriptionsServices";
import Link from "next/link";

import { v4 as uuid } from 'uuid';
import { MedicamentType, MedicamentsType, PrescriptionType, PrescriptionsType } from "@/ts/types";
import { Card, CardBody, CardFooter, CardHeader, Divider, User } from "@nextui-org/react";

type Props = {
    params: {
        id: number,
    }
}

const PrescriptionPage = async (props: Props) => {
    const data: any = await PrescriptionsServices().prescriptionShow(props?.params?.id);
    const prescription: PrescriptionType = await data?.prescription || {};

    const sidePanelData: any = await PrescriptionsServices().prescriptionsList();
    const prescriptions: PrescriptionsType = await sidePanelData?.prescriptions?.data || [];

    if (!prescription?.title?.length) return (<></>);

    return (
        <PageLayout>
            <div className="gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0">
                <div className="lg:col-span-4">
                    <Card>
                        <CardHeader>
                            <PageTitle
                                title={prescription.title}
                                breadCrumbs={[
                                    { url: "/prescriptions", title: 'Тreatments' }
                                ]}
                            ></PageTitle>
                        </CardHeader>

                        <Divider></Divider>

                        <CardBody>
                            <PageDescription title={prescription.title}
                                description={prescription.description}
                                rating={prescription.rating}
                                created_at={prescription.created_at}
                                category={prescription.category} />
                        </CardBody>

                        <Divider></Divider>

                        <CardFooter>
                            {
                                !!(prescription?.doctor?.full_name?.length) && (
                                    <Link href={`/doctors/${prescription?.doctor?.id}`}>
                                        <User
                                            name={prescription?.doctor?.full_name}
                                            description={prescription?.doctor?.specialty}
                                            avatarProps={{
                                                src: `${process.env.NEXT_PUBLIC_API_URL}/${prescription?.doctor?.image}`
                                            }}
                                        />
                                    </Link>
                                )
                            }
                        </CardFooter>
                    </Card>

                    {/* Medicaments */}
                    {
                        prescription?.medicaments_array && (
                            <div className="row">
                                <div className="py-4"></div>

                                <div className="col-12">
                                    {
                                        (prescription?.medicaments_array as MedicamentsType)?.map((medicament: MedicamentType) => {
                                            return (
                                                <div className="pb-3" key={uuid()}>
                                                    <MedicamentLink medicament={medicament}></MedicamentLink>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={prescriptions} bodyDataType={'prescriptions'}></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default PrescriptionPage;