import { UserType } from "@/ts/types";
import UserForm from "../userForm/userForm";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
    user: UserType
}

const UserEdit = (props: Props) => {

    const passData = (key: string, data: any) => {

    }

    const submitData = (event: React.SyntheticEvent) => {

    }

    return (
        <Card>
            <CardBody>
                <UserForm mode={'user-update'}
                    passData={passData}
                    submitData={submitData}></UserForm>
            </CardBody>
        </Card>
    )

}

export default UserEdit;