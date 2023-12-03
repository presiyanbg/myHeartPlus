'use client';
import React, { useState, createContext } from "react";
import { CacheType } from "../../ts/types";
import { CommonContextInterface } from "../../ts/interfaces";
interface CommonProviderProps {
    children: React.ReactNode
}

export const CommonContext = createContext<CommonContextInterface>({
    darkMode: false,
    toggleDarkMode: (toggle: boolean | undefined) => { },
    cache: {},
    setCache: (data: CacheType) => { },
});

export const CommonContextProvider = ({ children }: CommonProviderProps) => {
    const [darkMode, setDarkMode] = useState(false);
    const [cache, setCache] = useState<CacheType>({});

    /**
     * Toggle monitor size - Expanded/Collapsed
     * 
     * @param toggle boolean | undefined
     * @returns void
     */
    const toggleDarkMode = (toggle: boolean | undefined) => {
        if (typeof toggle === 'boolean') {
            setDarkMode(toggle);

            return;
        }

        if (toggle === undefined) {
            setDarkMode(prev => !prev);

            return;
        }
    }

    return (
        <CommonContext.Provider value={{
            darkMode,
            toggleDarkMode,
            cache,
            setCache
        }}>
            {children}
        </CommonContext.Provider>
    );
};

export default CommonContextProvider;