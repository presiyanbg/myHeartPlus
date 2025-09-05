'use client';

import { UserContext } from "@/context/userContext/userContextProvider";
import { divider, Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { PatientType } from "@/ts/types";
import { DynamicIcon } from 'lucide-react/dynamic';

import UserStatistics from "../../userComponents/userStatistics/userStatistics";
import UserControlPanel from "../../userComponents/userControlPanel/userControlPanel";
import UsersServicesClientServices from "@/services/usersServices/usersServicesClientServices";
import UserHealthEdit from "../../userComponents/userHealthEdit/userHealthEdit";
import UserHealthCheck from "../../userComponents/userHealthCheck/userHealthCheck";
import UserDoctorRecommendations from "../../userComponents/userDoctorRecommendations/userDoctorRecommendations";
import UserHealthHistory from "../../userComponents/userHealthHistory/userHealthHistory";

const UserHealthPortal = () => {
    const { user, medicalProfiles, token, refreshMedicalProfiles } = useContext(UserContext);
    const [role, setRole] = useState<string>('');
    const userService = UsersServicesClientServices();
    const t = useTranslations();

    // Default tabs
    let tabs = [
        {
            id: "stats",
            order: 0,
            label: t("Statistics"),
            icon: 'activity',
            content: (<UserStatistics user={user}></UserStatistics>),
        },
        {
            id: "health",
            order: 10,
            label: t("Health"),
            icon: 'heart',
            content: (<UserHealthEdit patient={medicalProfiles.patient as PatientType}></UserHealthEdit>),
        },
        {
            id: "healthCheck",
            order: 20,
            label: t("Health check"),
            icon: 'search',
            content: (<UserHealthCheck user={user}></UserHealthCheck>),
        },
        {
            id: "doctorRecommendations",
            order: 30,
            label: t("Doctor recommendations"),
            icon: 'user-round',
            content: (<UserDoctorRecommendations user={user}></UserDoctorRecommendations>),
        },
        {
            id: "history",
            order: 40,
            label: t("History"),
            icon: 'clock',
            content: (<UserHealthHistory user={user}></UserHealthHistory>),
        },
    ];

    // Doctor tabs
    if (role == 'doctor' || role == 'manager' || role == 'admin') {
        tabs.push(
            {
                id: "controlPanel",
                order: 0,
                label: t("Control panel"),
                icon: 'wrench',
                content: (<UserControlPanel user={user} doctor={medicalProfiles.doctor} role={role}></UserControlPanel>),
            }
        );
    }

    // Load user role 
    // Load medical profiles
    useEffect(() => {
        if (!token?.length) return;

        userService.getRole(token).then((data: any) => {
            if (data?.role == null) return;

            setRole(data?.role);

            userService.getUserMedicalProfiles(user.id).then((data: any) => {
                if (data?.medical_profiles) {
                    refreshMedicalProfiles(data.medical_profiles);
                }
            });
        });
    }, [token]);

    return (
        <>
            <Tabs aria-label="Health tabs"
                items={tabs}
                color="primary"
                className="px-1 w-full"
                fullWidth={true}
                classNames={{
                    tabList: "rounded-xl bg-background border border-border/50 p-1 mb-3",
                }}>
                {(item: any) => (
                    <Tab key={item.id}
                        title={
                            <div className="flex justify-between items-center content-between w-full">
                                <DynamicIcon name={item.icon} size={15}></DynamicIcon>

                                <span className="px-2">
                                    {item.label}
                                </span>
                            </div>
                        }>
                        <span className="text-lg">
                            {item.content}
                        </span>
                    </Tab>
                )}
            </Tabs>
        </>
    )
}

export default UserHealthPortal;