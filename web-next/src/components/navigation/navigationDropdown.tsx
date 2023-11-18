'use client';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button
} from "@nextui-org/react";
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { UserClass } from '../../ts/classes';
import { useTranslations } from 'next-intl';

type Props = {
    user: UserClass
};

const TopNavigationDropDown = (props: Props) => {
    // Translations
    const t = useTranslations();

    // User data
    const user = props.user;

    // Dropdown links
    const dropDownItems = [
        {
            key: "profilePage",
            label: t('Profile page'),
            link: '/users/profile',
        },
        {
            key: "themeSwitch",
            label: t('Dark mode'),
            link: '/themeSwitch',
        },
        {
            key: "authentication",
            label: t('Logout'),
            link: '/authentication',
        },
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">
                    <div className="image">
                        <img src={process.env.NEXT_PUBLIC_API_URL + user?.image} alt="User photo" />
                    </div>
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Dynamic Actions" items={dropDownItems}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === "delete" ? "danger" : "default"}
                        className={item.key === "delete" ? "text-danger" : ""}>
                        <Link href={item.link}>
                            {item.label}
                        </Link>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default TopNavigationDropDown;