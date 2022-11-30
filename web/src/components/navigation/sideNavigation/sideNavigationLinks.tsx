import React, { Fragment, useEffect, useState } from 'react';
import TopNavigationLink from './sideNavigationLink';
import { NavLinks, NavLink } from '../../../ts/types';
import Links from '../links';
import { v4 as uuid } from 'uuid';

const TopNavigationLinks = () => {
  const links = Links().links;

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