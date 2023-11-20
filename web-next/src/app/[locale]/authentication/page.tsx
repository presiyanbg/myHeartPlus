'use client';
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import React, { useState, useEffect, useContext } from 'react';
import Login from '../../../components/authentication/login/login';
import Logout from '../../../components/authentication/logout/logout';
import Registration from '../../../components/authentication/registration/registration';
import PageTitle from '../../../components/common/pageTitle/pageTitle';

import { UserContext } from '../../../context/userContext/userContextProvider';
import { useTranslations } from "next-intl";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const AuthenticationPage = () => {
    const [display, setDisplay] = useState<'login' | 'register' | 'logout'>('login');

    const { isAuth } = useContext(UserContext);
    const t = useTranslations();

    // Display login or register page
    const toggleDisplay = () => {
        setDisplay((prev) => {
            if (isAuth) {
                return 'logout';
            }

            if (prev == 'login') {
                return 'register';
            } else {
                return 'login';
            }
        });
    }

    // Check user authentication status
    useEffect(() => {
        toggleDisplay();
    }, [isAuth]);

    return (
        <PageLayout>
            <Card>
                <CardHeader>
                    <PageTitle title={t(display)}></PageTitle>
                </CardHeader>

                <Divider />

                <CardBody>
                    <div className="d-flex flex-column justify-content-between h-100">
                        {/* Logout page */}
                        {
                            isAuth && <Logout></Logout>
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
                                    <p className="cursor-pointer text-center" onClick={toggleDisplay}>
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
            </Card>

        </PageLayout>
    );
}

export default AuthenticationPage;
