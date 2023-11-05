import React, { useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { UserContext } from '../../context/userContext/userContextProvider';
import { LINKS } from "../../constants/links";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NavigationLinks = () => {
    const { isAuth } = useContext(UserContext)
    const t = useTranslations();

    /**
     * Display only links marked with topLink flag
     */
    return (
        <>
            {
                LINKS?.map((link) => {
                    // Don't show authentication links when user is logged in
                    if (link.authentication && isAuth) return <div key={uuid()}></div>;

                    // Don't show user specific links  when user is logged out
                    if (typeof link.isAuth == 'boolean' && link.isAuth && !isAuth) return <div key={uuid()}></div>;

                    if (link.topLink === true) {
                        return (
                            <Link href={link.url} key={uuid()} className="flex-auto flex justify-center items-center">
                                <span className="text-gray-900">
                                    <span>{t(link.title)}</span>
                                </span>
                            </Link>
                        )
                    }
                })
            }
        </>
    );
}

export default NavigationLinks;