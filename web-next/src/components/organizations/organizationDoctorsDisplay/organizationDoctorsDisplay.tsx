'use client';
import { DoctorType, DoctorsType } from "@/ts/types";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

type Props = {
    doctors: DoctorsType,
}

const OrganizationDoctorsDisplay = (props: Props) => {
    const [doctors, setDoctors] = useState<DoctorsType>(props?.doctors);

    useEffect(() => {
        if (!props?.doctors?.length) return;

        setDoctors(props?.doctors);
    }, [props]);

    return (
        <>
            <div className={"grid gap-4 lg:gap-8 " + `grid-cols-${doctors?.length || 0}`}>
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
        </>
    );
}

export default OrganizationDoctorsDisplay;