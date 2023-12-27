'use client';
import { UserType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Image, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";

type Props = {
    user: UserType,
}

const UserBasics = (props: Props) => {
    const t = useTranslations();
    const user = props?.user;

    if (!user) return (<>No results found </>);

    // User basic info 
    const infoArray = [
        {
            title: 'Name',
            value: user?.full_name,
        },
        {
            title: 'Date registered',
            value: parseDateAndTime(user?.created_at),
        },
        {
            title: 'Last login',
            value: parseDateAndTime(user?.last_activity),
        },
    ];

    return (
        <div className="flex">
            {/* Image and rating */}
            <div className="w-full md:w-1/3">
                {/* User picture */}
                <Suspense fallback={<Spinner></Spinner>}>
                    <Image
                        alt="User profile picture"
                        className="object-cover"
                        height={200}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`}
                    />
                </Suspense>
            </div>

            {/* Info */}
            <div className="w-full md:w-2/3 pl-2">
                {
                    infoArray?.map(info => {
                        return (
                            <div className="sm:grid sm:grid-cols-4 pb-2" key={uuid()}>
                                <div className="col-span-2 sm:text-right pr-2 font-bold">
                                    {t(info.title)}
                                </div>

                                <div className="col-span-2">
                                    {info.value}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserBasics;