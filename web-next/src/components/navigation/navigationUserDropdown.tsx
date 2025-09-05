'use client';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner, Switch, Avatar, DropdownSection } from "@nextui-org/react";
import { faAngleDoubleDown, faAngleDown, faArrowDown, faLanguage, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext/userContextProvider";
import { v4 as uuid } from 'uuid';
import { LoadingContext } from "@/context/loadingContext/loadingContextProvider";
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from "next-themes";
import { CommonContext } from "@/context/commonContext/commonContextProvider";
import { useParams } from "next/navigation";
import { getCurrentLocale, getCurrentPath } from "@/utils/utils";
import { Heart, Lock, User } from "lucide-react";

const NavigationUserDropdown = () => {
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [currentPath, setCurrentPath] = useState<string>('');
    const [currentLocale, setCurrentLocale] = useState<string>('');
    const { isAuth, user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);
    const { darkMode } = useContext(CommonContext);
    const { locale } = useParams<{ locale: string }>();
    const { toggleDarkMode } = useContext(CommonContext);
    const { setTheme } = useTheme();
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();

    /**
     * Handle click
     * 
     * @param e Click event
     * @param link string - Link to open
     */
    const handleLinkClick = (e: any, link: string) => {
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

    /**
     * Handle language change
     * 
     * @param e Event
     * @param lang string - Language code
     */
    const handleLanguageChange = (e: any, lang: string) => {
        router.push(pathname?.replace(`${locale}`, lang));
    }

    // Check loading
    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading]);

    // Initial checks 
    useEffect(() => {
        const storageDarkMode = JSON.parse(localStorage.getItem('darkMode') || '{}');

        if (storageDarkMode == null || storageDarkMode == undefined) {
            toggleDarkMode(false);
            return;
        }

        toggleDarkMode(!!storageDarkMode?.darkMode);
    }, []);

    // Update path and locale on pathname change
    useEffect(() => {
        setCurrentPath(getCurrentPath(pathname || ''));
        setCurrentLocale(getCurrentLocale(pathname || ''));
    }, [pathname]);

    return (
        <>
            {
                isLoaded ? (
                    <>
                        <Dropdown closeOnSelect={false} className="text-lg">
                            <DropdownTrigger>
                                <Button color="default" isIconOnly aria-label="language-menu" variant="bordered">
                                    <FontAwesomeIcon icon={faLanguage} />
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu aria-label="Language select" >
                                {/* Bulgarian */}
                                <DropdownItem
                                    key={uuid()}
                                    className={((currentLocale == 'bg') ? 'bg-primary text-white' : '')}
                                    onClick={(e) => handleLanguageChange(e, 'bg')}>
                                    <span className="text-lg">
                                        {t('Bulgarian')}
                                    </span>
                                </DropdownItem>

                                {/* Ukrainian */}
                                <DropdownItem
                                    key={uuid()}
                                    textValue={t('Ukrainian')}
                                    className={((currentLocale == 'uk') ? 'bg-primary text-white' : '')}
                                    onClick={(e) => handleLanguageChange(e, 'uk')}>
                                    <span className="text-lg">
                                        {t('Ukrainian')}
                                    </span>
                                </DropdownItem>

                                {/* English */}
                                <DropdownItem
                                    key={uuid()}
                                    textValue={t('English')}
                                    className={((currentLocale == 'en') ? 'bg-primary text-white' : '')}
                                    onClick={(e) => handleLanguageChange(e, 'en')}>
                                    <span className="text-lg">
                                        {t('English')}
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown closeOnSelect={false}>
                            <DropdownTrigger>
                                <Button color="default" aria-label="user-menu" variant="bordered" className="p-1">
                                    <div className="flex justify-center items-center">
                                        {
                                            isAuth && (
                                                <Avatar
                                                    radius="md"
                                                    size="sm"
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`}
                                                    alt="User photo" />
                                            )
                                        }

                                        {
                                            !isAuth && (<FontAwesomeIcon icon={faUser} />)
                                        }

                                        <span className="px-4">{t('Menu')}</span>

                                        <span className="pr-2">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </span>
                                    </div>
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu aria-label="User Actions">
                                <DropdownSection showDivider aria-label="Profile">
                                    <DropdownItem key="profile" isReadOnly >
                                        <div className="px-1 py-1">
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    {
                                                        isAuth && (
                                                            <Avatar
                                                                radius="sm"
                                                                size="lg"
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`}
                                                                alt="User photo" />
                                                        )
                                                    }

                                                    {
                                                        !isAuth && (<FontAwesomeIcon icon={faUser} />)
                                                    }
                                                </div>

                                                <div className="flex flex-col space-y-1">
                                                    <div className="text-sm font-medium">{user?.full_name}</div>
                                                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownItem>
                                </DropdownSection>

                                <DropdownSection showDivider aria-label="Links">
                                    {/* Profile page link */}
                                    <DropdownItem
                                        key={uuid()}
                                        className={(!isAuth ? 'hidden' : '') + ' mb-1 ' + ((currentPath == '/users/profile') ? 'bg-primary/10 text-primary ' : 'mb-1')}
                                        textValue={'profilePage'}
                                        onClick={(e) => handleLinkClick(e, '/users/profile')}>
                                        <div className="flex justify-start items-center space-x-3">
                                            <User className="h-4 w-4"></User>

                                            <span className="text-sm">
                                                {t('Profile')}
                                            </span>
                                        </div>
                                    </DropdownItem>

                                    {/* Profile page link */}
                                    <DropdownItem
                                        key={uuid()}
                                        className={(!isAuth ? 'hidden' : '') + ' mb-1 ' + ((currentPath == '/users/health') ? 'bg-primary/10 text-primary' : '')}
                                        textValue={'profilePage'}
                                        onClick={(e) => handleLinkClick(e, '/users/health')}>
                                        <div className="flex justify-start items-center space-x-3">
                                            <Heart className="h-4 w-4"></Heart>

                                            <span className="text-sm">
                                                {t('Health portal')}
                                            </span>
                                        </div>

                                    </DropdownItem>

                                    {/* Login/Logout link */}
                                    <DropdownItem
                                        key={uuid()}
                                        textValue={'authentication'}
                                        className={(!isAuth ? 'hidden' : '') + ' mb-1 ' + ((currentPath == '/authentication') ? 'bg-primary/10 text-primary' : '')}
                                        onClick={(e) => handleLinkClick(e, '/authentication')}>
                                        <div className="flex justify-start items-center space-x-3">
                                            <Lock className="h-4 w-4"></Lock>

                                            <span className="text-sm">
                                                {isAuth ? t('Logout') : t('Login')}
                                            </span>
                                        </div>
                                    </DropdownItem>

                                </DropdownSection>

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
                                        <span className="text-sm">
                                            {
                                                darkMode ? t('Dark mode') : t('Light mode')
                                            }
                                        </span>
                                    </Switch>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                ) : (
                    <Spinner color="default" />
                )
            }
        </>
    );
}

export default NavigationUserDropdown;