'use client';

import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import { UserContext } from "@/context/userContext/userContextProvider";
import { Card, CardBody, CardHeader, Divider, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import Logout from "../logout/logout";
import Login from "../login/login";
import Registration from "../registration/registration";
import { LoadingContext } from "@/context/loadingContext/loadingContextProvider";


const AuthenticationPortal = () => {
    const [display, setDisplay] = useState<'login' | 'register' | 'logout'>('login');
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);

    const { isAuth } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);

    const t = useTranslations();

    // Display login or register page
    const toggleDisplay = () => {
        setTimeout(() => {
            setDisplay((prev) => {
                if (isAuth) {
                    return 'logout';
                }

                if (prev == 'login') {
                    return 'register';
                }

                return 'login';
            });
        });
    }

    /**
     * Display login screen after user has logged out 
     */
    const displayLogin = () => {
        setDisplay('login');
    }

    // Check user authentication status
    useEffect(() => {
        if (!isAuth) return;

        toggleDisplay();
    }, [isAuth]);

    // Check loading
    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading]);

    return (
        <Card>
            {isLoaded &&
                <>
                    <CardHeader>
                        <PageTitle title={t(display)}></PageTitle>
                    </CardHeader>

                    <Divider />

                    <CardBody>
                        <div className="d-flex flex-column justify-content-between h-100">
                            {/* Logout page */}
                            {
                                isAuth && <Logout displayLogin={displayLogin}></Logout>
                            }

                            {/* Login / Registration page */}
                            {
                                !isAuth && <>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-8">
                                            {/* Login page */}
                                            {display == 'login' && <Login></Login>}

                                            {/* Registration page */}
                                            {display == 'register' && <Registration></Registration>}
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <p className="cursor-pointer text-center" onClick={() => toggleDisplay()}>
                                            {/* Login message */}
                                            {display == 'register' && t('Already have a registration?') + ' '}
                                            {display == 'register' && <span className="text-primary text--underline--hover">{t('Login here')}</span>}

                                            {/* Register message */}
                                            {display == 'login' && t('New user?') + ' '}
                                            {display == 'login' && <span className="text-primary text--underline--hover">{t('Register here')}</span>}
                                        </p>
                                    </div>
                                </>
                            }
                        </div>
                    </CardBody>
                </>
            }

            {!isLoaded &&
                <CardBody>
                    <Spinner color="default" />
                </CardBody>
            }
        </Card>
    );
}

export default AuthenticationPortal;