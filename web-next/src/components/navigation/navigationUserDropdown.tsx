'use client';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Avatar
} from "@nextui-org/react";
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext/userContextProvider";
import { v4 as uuid } from 'uuid';

const NavigationUserDropdown = () => {
    // Translations
    const t = useTranslations();

    // User data
    const { isAuth, user } = useContext(UserContext);

    // Dropdown links
    let dropDownItems = [
        {
            key: "themeSwitch",
            label: t('Dark mode'),
            link: '/themeSwitch',
        },
        {
            key: "authentication",
            label: isAuth ? t('Logout') : t('Login'),
            link: '/authentication',
        },
    ];

    // Add profile page link when auth
    useEffect(() => {
        dropDownItems.push({
            key: "profilePage",
            label: t('Profile page'),
            link: '/users/profile',
        });
    }, [isAuth]);

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button color="default" isIconOnly aria-label="user-menu" variant="bordered">
                    {
                        isAuth && (<Avatar src={process.env.NEXT_PUBLIC_API_URL + user?.image} alt="User photo" />)
                    }

                    {
                        !isAuth && (<FontAwesomeIcon icon={faUser} />)
                    }
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Dynamic Actions" items={dropDownItems}>
                {(item) => (
                    <DropdownItem
                        key={uuid()}
                        textValue={item.label}>
                        <Link href={item.link}
                            className="text-gray-800">
                            {item.label}
                        </Link>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default NavigationUserDropdown;