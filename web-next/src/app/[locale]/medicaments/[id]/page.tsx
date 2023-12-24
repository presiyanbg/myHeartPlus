import PageDescription from "@/components/common/pageDescription/pageDescription";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import SidePanel from "@/components/sidePanel/sidePanel";
import MedicamentsServices from "@/services/medicamentsServices/medicamentsServices";
import { MedicamentType, MedicamentsType } from "@/ts/types";
import { formatCurrency } from "@/utils/utils";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, User } from "@nextui-org/react";
import Link from "next/link";

type Props = {
    params: {
        id: number
    }
}

const MedicamentPage = async (props: Props) => {
    const data: any = await MedicamentsServices().medicamentShow(props?.params?.id);
    const medicament: MedicamentType = await data?.medicament || {};

    const sidePanelData: any = await MedicamentsServices().medicamentsList();
    const medicaments: MedicamentsType = await sidePanelData?.medicaments?.data || [];

    if (!medicament?.title?.length) return (<></>);

    return (
        <PageLayout>
            <div className="gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0">
                <div className="lg:col-span-4">
                    <Card>
                        <CardHeader>
                            <PageTitle
                                title={medicament.title}
                                breadCrumbs={[
                                    { url: "/prescriptions", title: 'Тreatments' }
                                ]}
                            ></PageTitle>
                        </CardHeader>

                        <Divider></Divider>

                        <CardBody>
                            <div className="flex">
                                {/* Image / price / buy */}
                                <div className="w-1/3 pr-4">
                                    <Image
                                        isZoomed
                                        radius="lg"
                                        width="100%"
                                        alt={medicament.title}
                                        className="w-full object-cover h-[180px]"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${medicament?.image}`} />

                                    {/* Price */}
                                    <div className="text-center text-green-500 pt-2">
                                        {formatCurrency(medicament.rating)}
                                    </div>

                                    {/* Buy */}
                                    <div className="text-center text-green-500 pt-2">
                                        <Button color="success">Buy now</Button>
                                    </div>
                                </div>

                                <div className="w-2/3">
                                    <PageDescription title={medicament.title}
                                        description={medicament.description}
                                        rating={medicament.rating}
                                        created_at={medicament.created_at}
                                        category={medicament.category} />
                                </div>
                            </div>
                        </CardBody>

                        {
                            //@TODO
                            //
                            // Add company for medicament as user 
                            //
                        }
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <SidePanel bodyData={medicaments} bodyDataType={'medicaments'}></SidePanel>
                </div>
            </div>
        </PageLayout >
    )
}

export default MedicamentPage;