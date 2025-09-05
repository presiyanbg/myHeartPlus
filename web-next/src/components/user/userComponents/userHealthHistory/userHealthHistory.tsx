'use client';
import { UserType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Button, Card, CardBody, CardHeader, Image, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import { Calendar, FileText, Pill, Activity } from "lucide-react";

type Props = {
    user: UserType,
}

const UserHealthHistory = (props: Props) => {
    const t = useTranslations();
    const user = props?.user;

    const historyItems = [
        {
            date: "Dec 20, 2024",
            type: "Appointment",
            title: "Annual Physical Exam",
            provider: "Dr. Sarah Johnson",
            icon: Calendar,
            status: "completed",
            emoji: "🩺"
        },
        {
            date: "Dec 18, 2024",
            type: "Lab Results",
            title: "Blood Work Panel",
            provider: "LabCorp",
            icon: FileText,
            status: "normal",
            emoji: "🧪"
        },
        {
            date: "Dec 15, 2024",
            type: "Prescription",
            title: "Medication Refill",
            provider: "Dr. Michael Chen",
            icon: Pill,
            status: "filled",
            emoji: "💊"
        },
        {
            date: "Dec 10, 2024",
            type: "Checkup",
            title: "Blood Pressure Monitor",
            provider: "Home Device",
            icon: Activity,
            status: "normal",
            emoji: "📊"
        },
        {
            date: "Dec 5, 2024",
            type: "Consultation",
            title: "Cardiology Follow-up",
            provider: "Dr. Michael Chen",
            icon: Calendar,
            status: "completed",
            emoji: "❤️"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "text-success";
            case "normal": return "text-accent";
            case "filled": return "text-primary";
            default: return "text-muted-foreground";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Appointment": return "text-primary";
            case "Lab Results": return "text-accent";
            case "Prescription": return "text-warning";
            case "Checkup": return "text-success";
            case "Consultation": return "text-destructive";
            default: return "text-muted-foreground";
        }
    };

    if (!user) return (<>No results found </>);

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-foreground text-2xl">Medical History</h1>
                <p className="text-muted-foreground">Your recent medical activities and records</p>
            </div>

            <div className="space-y-4">
                {historyItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Card key={index} className="hover:shadow-medium transition-all duration-300 glass-card">
                            <CardBody className="p-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex justify-center items-center bg-muted rounded-full w-12 h-12">
                                            <span className="text-2xl">{item.emoji}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                <div className="flex items-center space-x-3">
                                                    <span className={`text-sm font-medium ${getTypeColor(item.type)}`}>
                                                        {item.type}
                                                    </span>
                                                    <span className="text-muted-foreground text-sm">
                                                        {item.provider}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground text-xs">{item.date}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Icon className="w-4 h-4 text-muted-foreground" />
                                                <span className={`text-sm font-medium ${getStatusColor(item.status)} capitalize`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            <Card className="shadow-glow glass-card">
                <CardBody className="p-6 text-center">
                    <FileText className="mx-auto mb-3 w-8 h-8 text-primary-dark" />
                    <h3 className="mb-2 font-semibold text-xl">Complete Medical Records</h3>
                    <p className="mb-4 text-foreground/80 text-medium">
                        Access your full medical history and download records
                    </p>
                    <div className="flex sm:flex-row flex-col justify-center gap-2">
                        <Button variant="ghost" className="bg-background hover:bg-background/90 px-4 py-2 rounded-lg font-medium text-primary transition-colors">
                            View All Records
                        </Button>
                        <Button variant="solid" className="bg-primary-dark hover:bg-primary-dark/90 px-4 py-2 rounded-lg font-medium text-primary-foreground transition-colors">
                            Download PDF
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserHealthHistory;