'use client';

import UserView from "../userView/userView";
import UserEdit from "../userEdit/userEdit";
import UserStatistics from "../userStatistics/userStatistics";
import UserControlPanel from "../userControlPanel/userControlPanel";

import { UserContext } from "@/context/userContext/userContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import UsersServicesClientServices from "@/services/usersServices/usersServicesClientServices";

const UserProfile = () => {
    const { user, medicalProfiles, token } = useContext(UserContext);
    const [role, setRole] = useState<string>('');
    const userService = UsersServicesClientServices();
    const t = useTranslations();

    // Default tabs
    let tabs = [
        {
            id: "info",
            order: 0,
            label: t("Basic info"),
            content: (<UserView user={user}></UserView>),
        },
        {
            id: "edit",
            order: 10,
            label: t("Edit"),
            content: (<UserEdit user={user}></UserEdit>),
        },
        {
            id: "stats",
            order: 20,
            label: t("Statistics"),
            content: (<UserStatistics userId={user?.id}></UserStatistics>),
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
            <Tabs aria-label="User tabs"
                items={tabs}
                color="primary"
                className="w-full px-1"
                fullWidth={true}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {item.content}
                    </Tab>
                )}
            </Tabs>
        </>
    )
}

export default UserProfile;