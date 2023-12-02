'use client';
import React, { useState, createContext, useContext, useEffect } from "react";

interface LoadingProviderProps {
    children: React.ReactNode
}

export const LoadingContext = createContext({
    isLoading: false,
    setLoading: (active: boolean) => { },
    displayLoader: false,
    setDisplayLoader: (active: boolean) => { },
});

export const LoadingContextProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false);

    /**
     * Set main loading flag
     * 
     * @param loading boolean
     */
    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    }

    // Check for fully loaded page
    useEffect(() => {
        setTimeout(() => {
            if (document?.readyState != 'complete') {
                setLoading(true);
            }

            if (document?.readyState == 'complete') {
                setLoading(false);
            }
        }, 10)
    }, [])

    return (
        <LoadingContext.Provider value={{
            isLoading,
            setLoading,
            displayLoader,
            setDisplayLoader,
        }}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContextProvider;