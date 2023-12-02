'use client';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Avatar,
    Image,
    Spinner,
    Switch
} from "@nextui-org/react";

import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext/userContextProvider";
import { v4 as uuid } from 'uuid';
import { LoadingContext } from "@/context/loadingContext/loadingContextProvider";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationUserDropdown = () => {
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const { isAuth, user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);
    const t = useTranslations();
    const router = useRouter();

    // Change page
    const handleClick = (e: any, link: string) => {
        e.preventDefault();
        router.push(link);
    }

    // Check loading
    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading])

    // Toggle dark mode 
    useEffect(() => {
        const body = document.querySelector('body');

        if (!body) return;

        if (darkMode) {
            body?.classList?.add('dark');
        }

        if (!darkMode) {
            body?.classList?.remove('dark');
        }
    }, [darkMode])

    return (
        <>
            {
                isLoaded ? (
                    <Dropdown closeOnSelect={false}>
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

                        <DropdownMenu aria-label="User Actions">
                            {/* Profile page link */}
                            {
                                isAuth ? (
                                    <DropdownItem
                                        key={uuid()}
                                        textValue={'profilePage'}
                                        onClick={(e) => handleClick(e, '/users/profile')}>
                                        <span>
                                            {t('Profile page')}
                                        </span>
                                    </DropdownItem>
                                ) : (
                                    <></>
                                )
                            }

                            {/* Theme switch */}
                            <DropdownItem
                                key={uuid()}
                                textValue={'themeSwitch'}>
                                <Switch
                                    defaultSelected
                                    className="hover:outline-none focus:outline-none"
                                    size="sm"
                                    color="secondary"
                                    isSelected={darkMode}
                                    onValueChange={(e) => setDarkMode(e)}
                                    thumbIcon={({ isSelected, className }) =>
                                        isSelected ? (
                                            <FontAwesomeIcon icon={faMoon} className="hover:outline-none text-secondary focus:outline-none" />
                                        ) : (
                                            <FontAwesomeIcon icon={faSun} className="hover:outline-none focus:outline-none" />
                                        )
                                    }
                                >
                                    Dark mode
                                </Switch>
                            </DropdownItem>

                            {/* Login/Logout link */}
                            <DropdownItem
                                key={uuid()}
                                textValue={'authentication'}
                                onClick={(e) => handleClick(e, '/authentication')}>
                                <span>
                                    {isAuth ? t('Logout') : t('Login')}
                                </span>
                            </DropdownItem>
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