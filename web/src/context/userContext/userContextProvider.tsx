import React, { useState, createContext, useEffect } from "react";
import { ReactNoteInterface } from "../../ts/interfaces";

export const UserContext = createContext({
  user: {},
  setUser: (active: boolean) => { },
  isAuth: false,
  setIsAuth: (active: boolean) => { },
  token: '',
});

export const UserContextProvider = ({ children }: ReactNoteInterface) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');

  // Check user session on load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (user?.first_name && token?.length) {
      setUser(user);
      setIsAuth(true);
    }

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, token }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;