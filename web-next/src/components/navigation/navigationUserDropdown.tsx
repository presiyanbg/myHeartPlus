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
import { useTheme } from "next-themes";
import { CommonContext } from "@/context/commonContext/commonContextProvider";

const NavigationUserDropdown = () => {
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [mounted, setMounted] = useState(false)
    const { isAuth, user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);
    const { darkMode } = useContext(CommonContext);
    const { toggleDarkMode } = useContext(CommonContext);
    const { theme, setTheme } = useTheme();
    const t = useTranslations();
    const router = useRouter();

    /**
     * Handle click
     * 
     * @param e Click event
     * @param link string - Link to open
     */
    const handleLinkClick = (e: any, link: string) => {
        e.preventDefault();
        router.push(link);
    }

    /**
     * Toggle dark mode
     * 
     * @param mode boolean - Flag if dark mode is enabled 
     */
    const handleDarkModeSwitch = (mode: boolean) => {
        if (mode) {
            setTheme('dark');
            toggleDarkMode(mode);
        }

        if (!mode) {
            setTheme('light');
            toggleDarkMode(mode);
        }

        localStorage.setItem('darkMode', JSON.stringify({ darkMode: mode }));
    }

    // Check loading
    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading]);

    // Initial checks 
    useEffect(() => {
        setMounted(true);

        const storageDarkMode = JSON.parse(localStorage.getItem('darkMode') || '{}');

        if (storageDarkMode == null || storageDarkMode == undefined) {
            toggleDarkMode(false);
            return;
        }

        toggleDarkMode(!!storageDarkMode?.darkMode);
    }, []);

    if (!mounted) return null

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
                                        onClick={(e) => handleLinkClick(e, '/users/profile')}>
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
                                    onValueChange={(e) => handleDarkModeSwitch(e)}
                                    thumbIcon={({ isSelected, className }) =>
                                        isSelected ? (
                                            <FontAwesomeIcon icon={faMoon} className="hover:outline-none text-secondary focus:outline-none" />
                                        ) : (
                                            <FontAwesomeIcon icon={faSun} className="hover:outline-none focus:outline-none" />
                                        )
                                    }
                                >
                                    {
                                        darkMode ? t('Dark mode') : t('Light mode')
                                    }
                                </Switch>
                            </DropdownItem>

                            {/* Login/Logout link */}
                            <DropdownItem
                                key={uuid()}
                                textValue={'authentication'}
                                onClick={(e) => handleLinkClick(e, '/authentication')}>
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