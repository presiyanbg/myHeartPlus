'use client';
import React, { useState, createContext, useContext, useEffect } from "react";
import { NavLinksType } from "../../ts/types";
import { LINKS, LOGO_LINK } from "../../constants/links";
import { UserContext } from '../userContext/userContextProvider';

interface NavigationProviderProps {
    children: React.ReactNode
}

export const NavigationContext = createContext({
    links: LINKS,
    logoLink: LOGO_LINK
});

export const NavigationContextProvider = ({ children }: NavigationProviderProps) => {
    const [links, setLinks] = useState(LINKS);
    const logoLink = LOGO_LINK;

    return (
        <NavigationContext.Provider value={{ links, logoLink }}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContextProvider;