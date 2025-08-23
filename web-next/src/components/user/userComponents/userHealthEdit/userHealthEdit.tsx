'use client';
import { UserType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Card, CardBody, CardHeader, Image, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";

type Props = {
    user: UserType,
}

const UserHealthEdit = (props: Props) => {
    const t = useTranslations();
    const user = props?.user;

    if (!user) return (<>No results found </>);

    return (
        <Card>
            <CardHeader>
                <h4>Health information</h4>
            </CardHeader>
            
            <CardBody>
            </CardBody>
        </Card>
    )
}

export default UserHealthEdit;