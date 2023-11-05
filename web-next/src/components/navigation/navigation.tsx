'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavigationLinks from './navigationLinks';
import NavigationDropDown from './navigationDropdown';

import { v4 as uuid } from 'uuid';
import { UserContext } from '../../context/userContext/userContextProvider';
import { LOGO_LINK } from "../../constants/links";

const Navigation = () => {
    const { isAuth, user } = useContext(UserContext);

    return (
        <div className="bg-white sticky">
            <div className="md:w-34 w-screen lg:w-10/12 xl:w-8/12 mx-auto flex justify-center items-stretch pt-3 pb-3">
                {/* Logo */}
                <Link href={LOGO_LINK?.url} key={uuid()} className="block w-10 pl-3 lg:pl-0">
                    <Image src={LOGO_LINK?.logo} height={500} width={500} alt={'my Heart Plus Logo'}></Image>
                </Link>

                {/* Default Links */}
                <NavigationLinks></NavigationLinks>

                {/* User Panel */}
                <div>U</div>
                {/* {isAuth && <NavigationDropDown user={user}></NavigationDropDown>} */}
            </div>
        </div>
    )
}

export default Navigation;