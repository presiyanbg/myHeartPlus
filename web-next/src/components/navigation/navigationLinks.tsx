'use client';
import React from 'react';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { LINKS } from "../../constants/links";
import { useTranslations } from 'next-intl';
import { NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { getCurrentPath } from '@/utils/utils';

const NavigationLinks = () => {
    const t = useTranslations();
    const mainPath = getCurrentPath(usePathname());

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