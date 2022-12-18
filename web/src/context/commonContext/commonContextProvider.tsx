import React, { useState, createContext, useContext, useEffect } from "react";

interface CommonProviderProps {
  children: React.ReactNode
}

export const CommonContext = createContext({
  monitorExpanded: false,
  toggleMonitorExpanded: (toggle: boolean | undefined) => { },

});

export const CommonContextProvider = ({ children }: CommonProviderProps) => {
  const [monitorExpanded, setMonitorExpanded] = useState(false);

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
      toggleMonitorExpanded
    }}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContextProvider;