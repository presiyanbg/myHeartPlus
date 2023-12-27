'use client';

import { LoadingContext } from "@/context/loadingContext/loadingContextProvider";
import UserForm from "../userForm/userForm";
import UserEditLogic from "./userEditLogic";

import { UserFormType, UserType } from "@/ts/types";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { useContext, useState } from "react";
import Loading from "@/components/loading/loading";

type Props = {
    user: UserType
}

const UserEdit = (props: Props) => {
    const { isLoading } = useContext(LoadingContext);
    const [userData, setUserData] = useState<UserFormType>({
        'email': '',
        'first_name': '',
        'last_name': '',
        'profile_picture': '',
    });

    const logic = UserEditLogic();

    /**
     * Get user fields data 
     * 
     * @param key string
     * @param data any
     */
    const getUserData = (key: string, data: any) => {
        setUserData((prev: UserFormType) => {
            prev[key] = data;

            return prev;
        });
    }

    /**
     * Handle form submit
     * 
     * @param event HTML Form submit event
     */
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        logic.update(props.user?.id, userData);
    }

    // Check user authenticated
    if (!props.user?.id) {
        return (
            <Card>
                <CardBody>Unauthenticated</CardBody>
            </Card>
        )
    }

    // Check if loading
    if (isLoading) {
        return (
            <Card>
                <CardBody>
                    <div className="h-96 flex justify-center items-center">
                        <Spinner></Spinner>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return (
        <Card>
            <CardBody>
                <UserForm
                    user={props.user}
                    mode={'user-update'}
                    passData={getUserData}
                    submitData={handleSubmit}></UserForm>
            </CardBody>
        </Card>
    )

}

export default UserEdit;