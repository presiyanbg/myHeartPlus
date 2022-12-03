import React, { useState, createContext, useContext } from "react";
import { ReactNoteInterface } from "../../ts/interfaces";

export const UserContext = createContext({
  user: {},
  setUser: (active: boolean) => { },
  isAuth: false,
  setIsAuth: (active: boolean) => { },
});

export const UserContextProvider = ({ children }: ReactNoteInterface) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;