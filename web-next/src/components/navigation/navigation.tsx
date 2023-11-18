'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import NavigationLinks from './navigationLinks';
import NavigationDropDown from './navigationDropdown';

import { v4 as uuid } from 'uuid';
import { UserContext } from '../../context/userContext/userContextProvider';
import { LOGO_LINK } from "../../constants/links";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react';

const Navigation = () => {
    const { isAuth, user } = useContext(UserContext);

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
            <NavbarContent className="hidden sm:flex">
                <NavigationLinks></NavigationLinks>
            </NavbarContent>

            {/* User Panel */}
            <NavbarContent justify="end">
                <NavigationDropDown user={user}></NavigationDropDown>
            </NavbarContent>
        </Navbar >
    )
}

export default Navigation;