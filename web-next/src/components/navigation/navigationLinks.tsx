'use client';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { UserContext } from '../../context/userContext/userContextProvider';
import { LINKS } from "../../constants/links";
import { useTranslations } from 'next-intl';
import { NavbarItem, Link } from '@nextui-org/react';

const NavigationLinks = () => {
    const { isAuth } = useContext(UserContext);
    const t = useTranslations();

    /**
     * Display only links marked with topLink flag
     */
    return (
        <>
            {
                LINKS?.map((link) => {
                    // Don't show user specific links  when user is logged out
                    if (typeof link.isAuth == 'boolean' && link.isAuth && !isAuth) return <div key={uuid()}></div>;

                    if (link.topLink === true) {
                        return (
                            <NavbarItem key={uuid()}>
                                <Link href={link.url} color="foreground">
                                    {t(link.title)}
                                </Link>
                            </NavbarItem>
                        )
                    }
                })
            }
        </>
    );
}

export default NavigationLinks;