import React, { useEffect, useState } from 'react';
import TopNavigationLink from './topNavigationLink';
import { NavLinks } from '../../../ts/types';
import Links from '../links';
import { BrowserRouter as Router } from "react-router-dom";
import { v4 as uuid } from 'uuid';

const TopNavigationLinks = () => {
  const links = Links().links;

  /**
   * Display only links marked with topLink flag
   */
  const linkItems = links.map((link) => {
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