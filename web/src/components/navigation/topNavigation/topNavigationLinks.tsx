import React, { useContext, useEffect } from 'react';
import TopNavigationLink from './topNavigationLink';
import { v4 as uuid } from 'uuid';
import { NavigationContext } from '../../../context/navigationContext/navigationContextProvider';
import { UserContext } from '../../../context/userContext/userContextProvider';

const TopNavigationLinks = () => {
  const { links } = useContext(NavigationContext);
  const { isAuth } = useContext(UserContext)

  /**
   * Display only links marked with topLink flag
   */
  const linkItems = links.map((link) => {
    // Don't show authentication links when user is logged in
    if (link.authentication && isAuth) return;

    // Don't show user specific links  when user is logged out
    if (typeof link.isAuth == 'boolean' && link.isAuth && !isAuth) return;

    if (link.topLink === true) {
      return (
        <TopNavigationLink key={uuid()} {...link}></TopNavigationLink >)
    }
  });

  return (
    <>
      {linkItems}
    </>
  );
}

export default TopNavigationLinks;