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

const UserDoctorRecommendations = (props: Props) => {
    const t = useTranslations();
    const user = props?.user;

    if (!user) return (<>No results found </>);

    return (
        <div className="flex">
            userDoctorRecommendations
        </div>
    )
}

export default UserDoctorRecommendations;