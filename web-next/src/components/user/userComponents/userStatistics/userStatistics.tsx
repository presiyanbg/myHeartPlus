import { UserType } from "@/ts/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

type Props = {
    user: UserType
}

const UserStatistics = (props: Props) => {

console.log(props.user)

    return (
        <Card>
            <CardHeader>
                <h4>Health statistics</h4>
            </CardHeader>
            
            <CardBody>
            </CardBody>
        </Card>
    )
}

export default UserStatistics;