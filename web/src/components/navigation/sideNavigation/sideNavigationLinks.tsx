import React, { Fragment, useEffect, useState } from 'react';
import TopNavigationLink from './sideNavigationLink';
import { NavLinks, NavLink } from '../../../ts/types';
import Links from '../links';
import { BrowserRouter as Router } from "react-router-dom";
import { v4 as uuid } from 'uuid';

const TopNavigationLinks = () => {
  const linksComponent = Links();
  const [links, setLinks] = useState<NavLinks>(linksComponent.links);

  /**
   * Display only links marked with topLink flag
   */
  const linkItems = links.map((link) => {
    if (!link.logo) {
      link.onClick = linksComponent.updateSelectedLink;

      return (
        <TopNavigationLink key={uuid()} {...link}></ TopNavigationLink >
      )
    }
  });

  return (
    <Router>
      {linkItems}
    </Router>
  );
}

export default TopNavigationLinks;