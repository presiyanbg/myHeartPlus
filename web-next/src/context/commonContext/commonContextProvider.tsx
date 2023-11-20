'use client';
import React, { useState, createContext } from "react";
import { CacheType } from "../../ts/types";
import { CommonContextInterface } from "../../ts/interfaces";
interface CommonProviderProps {
    children: React.ReactNode
}

export const CommonContext = createContext<CommonContextInterface>({
    monitorExpanded: false,
    toggleMonitorExpanded: (toggle: boolean | undefined) => { },
    cache: {},
    setCache: (data: CacheType) => { }
});

export const CommonContextProvider = ({ children }: CommonProviderProps) => {
    const [monitorExpanded, setMonitorExpanded] = useState(false);
    const [cache, setCache] = useState<CacheType>({});

    /**
     * Toggle monitor size - Expanded/Collapsed
     * 
     * @param toggle boolean | undefined
     * @returns void
     */
    const toggleMonitorExpanded = (toggle: boolean | undefined) => {
        if (typeof toggle === 'boolean') {
            setMonitorExpanded(toggle);

            return;
        }

        if (toggle === undefined) {
            setMonitorExpanded(prev => !prev);

            return;
        }
    }

    return (
        <CommonContext.Provider value={{
            monitorExpanded,
            toggleMonitorExpanded,
            cache,
            setCache
        }}>
            {children}
        </CommonContext.Provider>
    );
};

export default CommonContextProvider;