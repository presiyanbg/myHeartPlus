import { UserType } from "@/ts/types";
import { Card, CardBody } from "@nextui-org/react";
import UserBasics from "../userComponents/userBasics/userBasics";

type Props = {
    user: UserType,
}

const UserView = (props: Props) => {
    return (
        <>
            <Card>
                <CardBody>
                    <UserBasics user={props.user}></UserBasics>
                </CardBody>
            </Card>
        </>
    )
}

export default UserView;