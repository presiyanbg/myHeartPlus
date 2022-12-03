import React, { useState, createContext, useContext, useEffect } from "react";

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingContext = createContext({
  isLoading: false,
  setLoading: (active: boolean) => { },
  urlIsLoading: {},
  setUrlLoading: (url: string, loading: boolean) => { },
});

export const LoadingContextProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [urlIsLoading, setUrlIsLoading] = useState({});

  /**
   * Set main loading flag
   * 
   * @param loading boolean
   */
  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  }

  /**
   * Set url as being loaded or not
   * 
   * @param url string
   * @param loading boolean
   */
  const setUrlLoading = (url: string, loading: boolean) => {

  }

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setLoading,
      urlIsLoading,
      setUrlLoading
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;