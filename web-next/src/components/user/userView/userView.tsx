import { UserType } from "@/ts/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import UserBasics from "../userComponents/userBasics/userBasics";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

type Props = {
    user: UserType,
}

const UserView = (props: Props) => {
    return (
        <>
            <div className="space-y-2 text-center mb-3">
                <h1 className="font-bold text-foreground text-2xl">Profile information</h1>
                <p className="text-muted-foreground">Base information of your profile</p>
            </div>

            <Card className="group hover:shadow-medium rounded-3xl overflow-hidden cursor-pointer glass-card mb-3">
                <CardBody>
                    <UserBasics user={props.user}></UserBasics>
                </CardBody>
            </Card>

            {/* Personal Information */}
            <Card className="glass-card border-0 shadow-soft">
                <CardHeader>
                    <div className="flex items-center space-x-2 w-full">
                        <strong>Personal Information</strong>
                    </div>
                </CardHeader>

                <CardBody className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm" htmlFor="name">Full Name</label>

                            <div className="flex items-center space-x-2 mt-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{props.user?.full_name}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm" htmlFor="email">Email</label>

                            <div className="flex items-center space-x-2 mt-1">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{props?.user.email}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm" htmlFor="phone">Phone</label>

                            <div className="flex items-center space-x-2 mt-1">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{props?.user?.email}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm" htmlFor="dob">Date of Birth</label>

                            <div className="flex items-center space-x-2 mt-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{props?.user.email}</span>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm" htmlFor="address">Address</label>

                            <div className="flex items-center space-x-2 mt-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{props?.user?.email}</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default UserView;