import React, { useState, createContext, useEffect } from "react";
import { ReactNoteInterface, UserContextInterface } from "../../ts/interfaces";
import { UserClass } from "../../ts/classes";
import { UserType } from "../../ts/types";

export const UserContext = createContext<UserContextInterface>({
  user: new UserClass(),
  setUser: (active: boolean) => { },
  isAuth: false,
  setIsAuth: (active: boolean) => { },
  token: '',
  authenticate: (userData: UserType, token: string) => { },
  renounce: () => { },
});

export const UserContextProvider = ({ children }: ReactNoteInterface) => {
  const [user, setUser] = useState(new UserClass());
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');

  /**
   * Authenticate user on login or register 
   * 
   * @param userData UserType 
   * @param token string
   */
  const authenticate = (userData: UserType, token: string) => {
    const user = new UserClass();
    user.setUser(userData);

    if (user?.first_name?.length > 0 && token?.length) {
      // Save data to local storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      // Save state
      setUser(user);
      setToken(token);
      setIsAuth(true);

      return;
    }

    setIsAuth(false);
  }

  const renounce = () => {
    // Remove data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear states
    setUser(new UserClass());
    setToken('');
    setIsAuth(false);
  }

  // Check user session on load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token') || '';

    authenticate(user, token);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, token, authenticate, renounce }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;