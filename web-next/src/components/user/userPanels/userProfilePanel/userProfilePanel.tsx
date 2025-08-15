'use client';

import { UserContext } from "@/context/userContext/userContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useContext } from "react";

import UserView from "../../userView/userView";
import UserEdit from "../../userComponents/userEdit/userEdit";
import UserSecurity from "../../userComponents/userSecurity/userSecurity";

const UserProfilePortal = () => {
    const { user, medicalProfiles, token } = useContext(UserContext);
    const t = useTranslations();

    // Default tabs
    let tabs = [
        {
            id: "info",
            order: 0,
            label: t("My profile"),
            content: (<UserView user={user}></UserView>),
        },
        {
            id: "edit",
            order: 10,
            label: t("Profile edit"),
            content: (<UserEdit user={user}></UserEdit>),
        },
        {
            id: "security",
            order: 20,
            label: t("Security and privacy"),
            content: (<UserSecurity user={user}></UserSecurity>),
        },
    ];

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

export default UserProfilePortal;