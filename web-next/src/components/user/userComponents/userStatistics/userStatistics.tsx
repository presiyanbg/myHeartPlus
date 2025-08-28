import { UserType } from "@/ts/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import UserDailyStatistics from "../userDailyStatistics/userDailyStatistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

type Props = {
    user: UserType
}

const UserStatistics = (props: Props) => {
    return (
        <div className="flex flex-row">
            <div className="w-2/3 pr-2">
                <Card>
                    <CardHeader>
                        <div className="py-2 px-4">
                            <h3>Health statistics</h3>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div>
                            <div className="text-center w-full pt-3 pb-3">
                                <FontAwesomeIcon icon={faSmile} className="text-9xl pb-3 text-success-500" />

                                <div className="w-full pt-1 pb-1">
                                    <span>
                                        General condition:
                                    </span>

                                    <span className="pl-2 font-bold text-success-500">
                                        GOOD
                                    </span>
                                </div>
                            </div>

                            <div>

                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="w-1/3">
                <Card>
                    <CardBody>
                        <UserDailyStatistics></UserDailyStatistics>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default UserStatistics;