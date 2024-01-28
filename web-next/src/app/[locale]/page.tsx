import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import OrganizationsServices from "@/services/organizationsServices/organizationsServices";
import { DoctorType, DoctorsType, OrganizationsType } from "@/ts/types";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import { v4 as uuid } from 'uuid';

const Home = async () => {
    let data: any;
    let organizations: OrganizationsType = [] as OrganizationsType;

    let dataOrganizationDoctors: any;
    let doctors: DoctorsType = [] as DoctorsType;

    try {
        data = await OrganizationsServices().organizationsList();
        organizations = await data?.organizations || [];

        dataOrganizationDoctors = await OrganizationsServices().organizationDoctors(organizations[0]?.id || 0);
        doctors = await dataOrganizationDoctors?.data || [];
    } catch (ex) {
        console.error(ex);
    }

    return (
        <>
            <PageLayout>
                <div className="text-center py-8">
                    <h1>FIT 4 HEALTH</h1>
                </div>

                <div className="grid grid-cols-4 gap-4 lg:gap-8">
                    <div className=" col-span-4 ">
                        <hr />
                    </div>

                    {
                        !!(doctors?.length > 0) && (
                            doctors.map((doctor: DoctorType) => {
                                return (
                                    <Link href={`/doctors/${doctor?.id}`} key={uuid()}
                                        className="hover:cursor-pointer hover:scale-110 transition duration-500 cursor-pointer hover:z-50 col-span-2 md:col-span-1">
                                        <Card isFooterBlurred className="w-full h-[300px] md:h-[400px] col-span-12 sm:col-span-5">
                                            <div className="flex items-center justify-items-center h-full w-full">
                                                <Image
                                                    isZoomed
                                                    className="min-h-[300px] md:min-h-[400px] h-fit w-fit"
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${doctor?.image}`}
                                                    alt={doctor.full_name} />
                                            </div>

                                            <CardFooter className="absolute bg-white/60 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                                <div className="text-center w-full">
                                                    <h5 className="font-bold text-black">{doctor.full_name}</h5>
                                                    <p className="text-tiny uppercase font-bold text-black">{doctor.specialty}</p>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                )
                            })
                        )
                    }
                </div>
            </PageLayout>

            <div className="py-16">

            </div>
        </>
    )
}

export default Home;
