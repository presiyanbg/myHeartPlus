import { UserType } from "@/ts/types";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
    user: UserType
}

const UserStatistics = (props: Props) => {

    return (
        <Card>
            <CardBody>
                Data
            </CardBody>
        </Card>
    )
}

export default UserStatistics;