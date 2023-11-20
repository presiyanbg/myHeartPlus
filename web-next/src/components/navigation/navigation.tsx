'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import NavigationLinks from './navigationLinks';
import NavigationDropDown from './navigationDropdown';

import { v4 as uuid } from 'uuid';
import { LOGO_LINK } from "../../constants/links";
import { Navbar, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import NavigationLinksMenu from './navigationLinksMenu';

const Navigation = () => {
    return (
        <Navbar className="bg-white" shouldHideOnScroll>
            {/* Logo */}
            <NavbarContent justify="start">
                <NavbarItem key={uuid()} className="block w-10 pl-3 lg:pl-0">
                    <Link href={LOGO_LINK?.url}>
                        <Image src={LOGO_LINK?.logo} height={500} width={500} alt={'my Heart Plus Logo'}></Image>
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {/* Default Links */}
            <NavbarContent className="hidden md:flex">
                <NavigationLinks></NavigationLinks>
            </NavbarContent>

            <NavbarContent justify="end">
                {/* Link menu */}
                <NavbarContent className="md:hidden" justify="end">
                    <NavigationLinksMenu></NavigationLinksMenu>
                </NavbarContent>

                {/* User Panel */}
                <NavigationDropDown></NavigationDropDown>
            </NavbarContent>
        </Navbar >
    )
}

export default Navigation;