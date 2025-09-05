'use client';
import { UserType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Button, Card, CardBody, CardHeader, Image, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import { Thermometer, Scale, Eye, Stethoscope } from "lucide-react";

type Props = {
    user: UserType,
}

const UserHealthCheck = (props: Props) => {
    const t = useTranslations();
    const user = props?.user;

    const checkupItems = [
        {
            title: "Blood Pressure",
            icon: Stethoscope,
            lastCheck: "2 days ago",
            result: "120/80",
            status: "normal",
            emoji: "✅"
        },
        {
            title: "Body Temperature",
            icon: Thermometer,
            lastCheck: "Today",
            result: "98.6°F",
            status: "normal",
            emoji: "🌡️"
        },
        {
            title: "Weight Check",
            icon: Scale,
            lastCheck: "1 week ago",
            result: "165 lbs",
            status: "stable",
            emoji: "⚖️"
        },
        {
            title: "Eye Exam",
            icon: Eye,
            lastCheck: "3 months ago",
            result: "20/20",
            status: "excellent",
            emoji: "👁️"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "excellent": return "text-success";
            case "normal": return "text-accent";
            case "stable": return "text-primary";
            default: return "text-muted-foreground";
        }
    };

    if (!user) return (<>No results found </>);

    return (
        <>
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-foreground text-2xl">Health Checkups</h1>
                <p className="text-muted-foreground">Recent tests and examinations</p>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-1 pt-5">
                {checkupItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Card key={index} className="hover:shadow-medium transition-all duration-300 glass-card">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center space-x-3">
                                        <Icon className="w-5 h-5 text-primary" />
                                        <span className="text-foreground">{item.title}</span>

                                        <span className={`text-sm font-medium ${getStatusColor(item.status)} capitalize`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-foreground text-lg">{item.result}</span>
                                </div>

                                <p className="text-muted-foreground text-sm">
                                    Last checked: {item.lastCheck}
                                </p>

                                <Button variant="ghost" size="sm" className="w-full">
                                    View Details
                                </Button>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </>
    )
}

export default UserHealthCheck;