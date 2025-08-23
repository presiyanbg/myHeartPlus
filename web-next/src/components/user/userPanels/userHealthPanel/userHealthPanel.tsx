'use client';

import { UserContext } from "@/context/userContext/userContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";

import UserStatistics from "../../userComponents/userStatistics/userStatistics";
import UserControlPanel from "../../userComponents/userControlPanel/userControlPanel";
import UsersServicesClientServices from "@/services/usersServices/usersServicesClientServices";
import UserHealthEdit from "../../userComponents/userHealthEdit/userHealthEdit";
import UserHealthCheck from "../../userComponents/userHealthCheck/userHealthCheck";
import UserDoctorRecommendations from "../../userComponents/userDoctorRecommendations/userDoctorRecommendations";
import UserHealthHistory from "../../userComponents/userHealthHistory/userHealthHistory";

const UserHealthPortal = () => {
    const { user, medicalProfiles, token } = useContext(UserContext);
    const [role, setRole] = useState<string>('');
    const userService = UsersServicesClientServices();
    const t = useTranslations();

    // Default tabs
    let tabs = [
        {
            id: "stats",
            order: 0,
            label: t("Statistics"),
            content: (<UserStatistics user={user}></UserStatistics>),
        },
        {
            id: "health",
            order: 10,
            label: t("Health"),
            content: (<UserHealthEdit user={user}></UserHealthEdit>),
        },
        {
            id: "healthCheck",
            order: 20,
            label: t("Health check"),
            content: (<UserHealthCheck user={user}></UserHealthCheck>),
        },
        {
            id: "doctorRecommendations",
            order: 30,
            label: t("Doctor recommendations"),
            content: (<UserDoctorRecommendations user={user}></UserDoctorRecommendations>),
        },
        {
            id: "history",
            order: 40,
            label: t("History"),
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
                content: (<UserControlPanel user={user} doctor={medicalProfiles.doctor} role={role}></UserControlPanel>),
            }
        );
    }

    // Load user role 
    useEffect(() => {
        if (!token?.length) return;

        userService.getRole(token).then((data: any) => {
            setRole(data?.role);
        })
    }, [token]);

    return (
        <>
            <Tabs aria-label="Health tabs"
                items={tabs}
                color="primary"
                className="w-full px-1"
                fullWidth={true}>
                {(item: any) => (
                    <Tab key={item.id}
                        title={<span className="uppercase">{item.label}</span>}>
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