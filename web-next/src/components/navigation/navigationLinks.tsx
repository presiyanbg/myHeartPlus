'use client';
import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { UserContext } from '../../context/userContext/userContextProvider';
import { LINKS } from "../../constants/links";
import { useTranslations } from 'next-intl';
import { NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavigationLinks = () => {
    const { isAuth } = useContext(UserContext);
    const t = useTranslations();

    // Get active link
    const pathnamesArray = usePathname()?.split('/') || [];
    const localePaths = ['bg', 'en'];
    let mainPath = '/';

    // Get active link when default localization  
    if (pathnamesArray?.length > 0 && !localePaths.includes(pathnamesArray[1])) {
        mainPath = '/' + pathnamesArray[1];
    }

    // Get active link when localization is active
    if (pathnamesArray?.length > 0 && localePaths.includes(pathnamesArray[1])) {
        mainPath = '/' + pathnamesArray[2];
    }

    return (
        <>
            {
                LINKS?.map((link) => {
                    return (
                        <NavbarItem key={uuid()}>
                            <Link href={link.url}
                                shallow={true}
                                className={(mainPath == link.url) ? 'text-blue-500' : 'foreground'}>
                                {t(link.title)}
                            </Link>
                        </NavbarItem>
                    )
                })
            }
        </>
    );
}

export default NavigationLinks;