import React, { useContext } from 'react';
import TopNavigationLink from './sideNavigationLink';
import { v4 as uuid } from 'uuid';
import { NavigationContext } from '../../../context/navigationContext/navigationContextProvider';

const TopNavigationLinks = () => {
  const { links } = useContext(NavigationContext);

  /**
   * Display only links marked with topLink flag
   */
  const linkItems = links.map((link) => {
    if (!link.logo) {
      return (
        <TopNavigationLink key={uuid()} {...link}></ TopNavigationLink >
      )
    }
  });

  return (
    <>
      {linkItems}
    </>
  );
}

export default TopNavigationLinks;