'use client';

import { UserContext } from "@/context/userContext/userContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { DynamicIcon } from 'lucide-react/dynamic';

import UserView from "../../userView/userView";
import UserEdit from "../../userComponents/userEdit/userEdit";
import UserSecurity from "../../userComponents/userSecurity/userSecurity";

const UserProfilePortal = () => {
    const { user, medicalProfiles, token } = useContext(UserContext);
    const t = useTranslations();

    // Default tabs
    let tabs: {
        id: string,
        order: number,
        label: string,
        icon: any,
        content: React.ReactNode
    }[] = [
            {
                id: "info",
                order: 0,
                label: t("My profile"),
                icon: 'user',
                content: (<UserView user={user}></UserView>),
            },
            {
                id: "edit",
                order: 10,
                label: t("Profile edit"),
                icon: 'pencil',
                content: (<UserEdit user={user}></UserEdit>),
            },
            {
                id: "security",
                order: 20,
                label: t("Security and privacy"),
                icon: 'shield-ellipsis',
                content: (<UserSecurity user={user}></UserSecurity>),
            },
        ];

    return (
        <>
            <Tabs aria-label="User tabs"
                items={tabs}
                color="primary"
                className="px-1 w-full"
                fullWidth={true}
                classNames={{
                    tabList: "rounded-xl bg-background border border-border/50 p-1 mb-3",
                }}>
                {(item) => (
                    <Tab key={item.id}
                        title={
                            <div className="flex justify-between items-center content-between w-full">
                                <DynamicIcon name={item.icon} size={15}></DynamicIcon>

                                <span className="px-2">
                                    {item.label}
                                </span>
                            </div>
                        }>
                        {item.content}
                    </Tab>
                )}
            </Tabs>
        </>
    )
}

export default UserProfilePortal;