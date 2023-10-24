import React, { useState, useEffect, useContext } from 'react';
import Login from '../../components/authenticationComponents/login/login';
import Logout from '../../components/authenticationComponents/logout/logout';
import Registration from '../../components/authenticationComponents/registration/registration';
import PageTitle from '../../components/commonComponents/pageTitle/pageTitle';

import { UserContext } from '../../context/userContext/userContextProvider';
import { useTranslation } from 'react-i18next';

const Authentication = () => {
    const [display, setDisplay] = useState<'login' | 'register' | 'logout'>('login');

    const { isAuth } = useContext(UserContext);
    const { t } = useTranslation();

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
        <div className="wrapper">
            <div className="page">
                <PageTitle title={t(display)}></PageTitle>

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

                            <div className="row">
                                <div className="col-12">
                                    <p className="cursor--pointer text-center" onClick={toggleDisplay}>

                                        {/* Login message */}
                                        {display == 'register' && t('Already have a registration?') + ' '}
                                        {display == 'register' && <span className="text-primary text--underline--hover">{t('Login here')}</span>}

                                        {/* Register message */}
                                        {display == 'login' && t('New user?') + ' '}
                                        {display == 'login' && <span className="text-primary text--underline--hover">{t('Register here')}</span>}
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Authentication;
