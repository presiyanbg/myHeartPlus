'use client';
import { UserType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { Badge, Button, Card, CardBody, CardHeader, Chip, Image, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import { Phone, Video, MessageCircle, Calendar } from "lucide-react";
import { FileText, TrendingUp, AlertTriangle, CheckCircle, Brain, Target } from "lucide-react";

type Props = {
    user: UserType,
}

const UserDoctorRecommendations = (props: Props) => {
    const recommendations = [
        {
            id: 1,
            type: "Urgent",
            category: "Blood Pressure",
            title: "Monitor Blood Pressure Daily",
            description: "Your recent readings show elevated blood pressure (145/90). Please monitor daily and consider lifestyle changes.",
            priority: "high",
            icon: AlertTriangle,
            doctorName: "Dr. Sarah Johnson",
            date: "2024-01-15",
            actions: [
                "Take readings twice daily at same times",
                "Reduce sodium intake to <2300mg/day",
                "Exercise 30 minutes daily",
                "Follow up in 2 weeks"
            ]
        },
        {
            id: 2,
            type: "Advisory",
            category: "Cholesterol",
            title: "Dietary Modifications Recommended",
            description: "LDL cholesterol is slightly elevated at 145 mg/dL. Dietary changes can help bring this to optimal levels.",
            priority: "medium",
            icon: TrendingUp,
            doctorName: "Dr. Michael Chen",
            date: "2024-01-12",
            actions: [
                "Increase omega-3 rich foods",
                "Limit saturated fats to <7% of calories",
                "Add 25g fiber daily",
                "Recheck lipids in 3 months"
            ]
        },
        {
            id: 3,
            type: "Positive",
            category: "Weight Management",
            title: "Excellent Progress on Weight Goals",
            description: "You've successfully lost 8 lbs in the past 2 months. Keep up the great work!",
            priority: "low",
            icon: CheckCircle,
            doctorName: "Dr. Emily Rodriguez",
            date: "2024-01-10",
            actions: [
                "Continue current exercise routine",
                "Maintain portion control habits",
                "Celebrate non-scale victories",
                "Next weigh-in in 4 weeks"
            ]
        },
        {
            id: 4,
            type: "Preventive",
            category: "Mental Health",
            title: "Stress Management Techniques",
            description: "Given your high-stress lifestyle, implementing stress reduction techniques would be beneficial.",
            priority: "medium",
            icon: Brain,
            doctorName: "Dr. Sarah Johnson",
            date: "2024-01-08",
            actions: [
                "Practice 10 minutes daily meditation",
                "Try progressive muscle relaxation",
                "Consider yoga or tai chi",
                "Schedule regular breaks during work"
            ]
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "destructive";
            case "medium": return "warning";
            case "low": return "success";
            default: return "secondary";
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case "high": return AlertTriangle;
            case "medium": return TrendingUp;
            case "low": return CheckCircle;
            default: return FileText;
        }
    };
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-foreground text-2xl">Doctor Recommendations</h1>
                <p className="text-muted-foreground">Personalized advice based on your health data</p>
            </div>

            {/* Summary Stats */}
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
                <Card className="glass-card">
                    <CardBody className="p-4 text-center">
                        <div className="font-bold text-destructive text-2xl">1</div>
                        <div className="text-muted-foreground text-sm">Urgent</div>
                    </CardBody>
                </Card>
                <Card className="glass-card">
                    <CardBody className="p-4 text-center">
                        <div className="font-bold text-warning text-2xl">2</div>
                        <div className="text-muted-foreground text-sm">Advisory</div>
                    </CardBody>
                </Card>
                <Card className="glass-card">
                    <CardBody className="p-4 text-center">
                        <div className="font-bold text-success text-2xl">1</div>
                        <div className="text-muted-foreground text-sm">Positive</div>
                    </CardBody>
                </Card>
                <Card className="glass-card">
                    <CardBody className="p-4 text-center">
                        <div className="font-bold text-primary text-2xl">4</div>
                        <div className="text-muted-foreground text-sm">Total</div>
                    </CardBody>
                </Card>
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
                {recommendations.map((rec) => {
                    const Icon = rec.icon;
                    const priorityColor = getPriorityColor(rec.priority);

                    return (
                        <Card key={rec.id} className="hover:shadow-medium transition-all duration-300 glass-card">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start w-full">

                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-full bg-${priorityColor}/20`}>
                                            <Icon className={`h-5 w-5 text-${priorityColor}`} />
                                        </div>
                                        <div>
                                            <div className="text-foreground text-lg">{rec.title}</div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Chip size="sm" variant="light" className="bg-background text-primary text-xs"
                                                >
                                                    {rec.category}
                                                </Chip>

                                                <Chip size="sm" className="text-xs" color="secondary">
                                                    {rec.type}
                                                </Chip>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-muted-foreground text-xs text-right">
                                        <div>{rec.doctorName}</div>
                                        <div>{rec.date}</div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardBody className="space-y-4">
                                <p className="text-medium text-muted-foreground">{rec.description}</p>

                                <div className="space-y-2">
                                    <h4 className="flex items-center space-x-2 font-semibold text-foreground">
                                        <Target className="w-4 h-4" />
                                        <span>Action Plan</span>
                                    </h4>
                                    <ul className="space-y-1">
                                        {rec.actions.map((action, index) => (
                                            <li key={index} className="flex items-center space-x-2 text-muted-foreground text-sm">
                                                <span className="text-primary">•</span>
                                                <span>{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex space-x-2 pt-2">
                                    <Button variant="ghost" size="sm">
                                        Mark as Read
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Ask Follow-up
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            {/* CTA Card */}
            <Card className="shadow-glow glass-card">
                <CardBody className="p-6 text-center">
                    <FileText className="mx-auto mb-3 w-8 h-8 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground text-lg">Need More Guidance?</h3>
                    <p className="mb-4 text-muted-foreground">
                        Schedule a consultation to discuss these recommendations in detail
                    </p>
                    <Button variant="ghost" size="lg">
                        Schedule Consultation
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserDoctorRecommendations;