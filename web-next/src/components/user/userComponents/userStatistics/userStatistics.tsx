import { UserType } from "@/ts/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import UserDailyStatistics from "../userDailyStatistics/userDailyStatistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { TrendingUp, TrendingDown, Heart, Activity, Target } from "lucide-react";

interface HealthCondition {
    condition: string;
    emoji: string;
    status: "excellent" | "good" | "moderate" | "poor";
    trend: "up" | "down" | "stable";
    value: string;
    description: string;
}

type Props = {
    user: UserType
}

const UserStatistics = (props: Props) => {
    const healthConditions: HealthCondition[] = [
        {
            condition: "Overall Health",
            emoji: "😊",
            status: "good",
            trend: "up",
            value: "85%",
            description: "Your health is trending upward"
        },
        {
            condition: "Heart Rate",
            emoji: "❤️",
            status: "excellent",
            trend: "stable",
            value: "72 BPM",
            description: "Normal resting heart rate"
        },
        {
            condition: "Sleep Quality",
            emoji: "😴",
            status: "moderate",
            trend: "down",
            value: "6.2h",
            description: "Could use more rest"
        },
        {
            condition: "Stress Level",
            emoji: "🧘",
            status: "good",
            trend: "down",
            value: "Low",
            description: "Well managed stress"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "excellent": return "text-success";
            case "good": return "text-accent";
            case "moderate": return "text-warning";
            case "poor": return "text-destructive";
            default: return "text-muted-foreground";
        }
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up": return <TrendingUp className="w-4 h-4 text-success" />;
            case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
            default: return <Activity className="w-4 h-4 text-muted-foreground" />;
        }
    };

    interface StatsTabProps {
        onNavigateToHealth: () => void;
    }

    return (
        <div className="space-y-12">
            <div className="space-y-6 text-center">
                <div className="pb-1">
                    <h1 className="bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 font-bold text-transparent text-5xl">
                        Health Overview
                    </h1>
                </div>

                <p className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed">
                    Track your daily health metrics and stay on top of your wellness journey with intelligent insights
                </p>
            </div>

            {/* Health Goals - Modern Transparent Green Box */}
            <Card className="group hover:shadow-medium rounded-3xl overflow-hidden cursor-pointer animated-card glass-card">
                <CardBody className="relative p-12 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10"></div>
                    <div className="z-10 relative space-y-6">
                        <div className="inline-flex justify-center items-center bg-success/10 mb-2 rounded-full w-20 h-20">
                            <Target className="w-10 h-10 text-success" />
                        </div>
                        <h3 className="font-bold text-success text-3xl tracking-tight">Health Goals</h3>
                        <div className="font-black text-success text-7xl">3<span className="text-success/60 text-4xl">/4</span></div>
                        <p className="font-medium text-foreground/80 text-lg">
                            View your daily progress →
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Health Conditions Grid */}
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                {healthConditions.map((item, index) => (
                    <Card key={index} className="group hover:shadow-medium rounded-3xl overflow-hidden cursor-pointer animated-card glass-card">
                        <CardHeader className="px-8 pt-8 pb-6">
                            <div className="flex justify-between content-between w-full text-xl">
                                <span className="font-bold text-foreground tracking-tight">{item.condition}</span>
                                <div className="bg-muted/50 p-2 rounded-full">
                                    {getTrendIcon(item.trend)}
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-6 px-8 pb-8">
                            <div className="space-y-4 text-center">
                                <div className="text-6xl leading-none">{item.emoji}</div>
                                <div className={`text-3xl font-black tracking-tight ${getStatusColor(item.status)}`}>
                                    {item.value}
                                </div>
                            </div>
                            <p className="font-medium text-foreground/70 text-center leading-relaxed">
                                {item.description}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Daily Health Score */}
            <Card className="group hover:shadow-medium rounded-3xl overflow-hidden cursor-pointer animated-card glass-card">
                <CardBody className="relative p-10 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10"></div>
                    <div className="z-10 relative space-y-6">
                        <div className="inline-flex justify-center items-center bg-success/10 rounded-full w-16 h-16">
                            <Heart className="w-8 h-8 text-success" />
                        </div>
                        <h3 className="font-bold text-success text-3xl tracking-tight">Daily Health Score</h3>
                        <div className="font-black text-success text-6xl">82<span className="text-success/60 text-3xl">/100</span></div>
                        <p className="font-medium text-foreground/80 text-lg">Great job maintaining your health today!</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );

}

export default UserStatistics;