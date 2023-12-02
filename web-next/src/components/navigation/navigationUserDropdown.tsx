'use client';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Avatar,
    Image,
    Spinner
} from "@nextui-org/react";
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext/userContextProvider";
import { v4 as uuid } from 'uuid';
import { LoadingContext } from "@/context/loadingContext/loadingContextProvider";
import { useRouter } from 'next/navigation';

const NavigationUserDropdown = () => {
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const { isAuth, user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);
    const t = useTranslations();
    const router = useRouter();

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

    // Change page
    const handleClick = (e: any, link: string) => {
        e.preventDefault();
        router.push(link);
    }

    // Add profile page link when auth
    useEffect(() => {
        if (!isAuth) return;

        dropDownItems.unshift({
            key: "profilePage",
            label: t('Profile page'),
            link: '/users/profile',
        });
    }, [isAuth]);

    // Check loading
    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading])

    return (
        <>
            {
                isLoaded ? (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button color="default" isIconOnly aria-label="user-menu" variant="bordered">
                                {
                                    isAuth && (
                                        <Image
                                            className="rounded-none"
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`}
                                            alt="User photo" />
                                    )
                                }

                                {
                                    !isAuth && (<FontAwesomeIcon icon={faUser} />)
                                }
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="User Actions" items={dropDownItems}>
                            {(item) => (
                                <DropdownItem
                                    key={uuid()}
                                    textValue={item.label}
                                    onClick={e => handleClick(e, item.link)}>
                                    <span className="text-gray-800" >
                                        {item.label}
                                    </span>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Spinner color="default" />
                )
            }
        </>
    );
}

export default NavigationUserDropdown;