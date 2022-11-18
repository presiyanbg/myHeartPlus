import React, { Fragment, useState } from 'react';
import TopNavigationLink from './topNavigationLink';
import { NavLinks } from '../../../ts/types';
import { Links } from '../links';

const TopNavigationLinks = () => {
  const [links, setLinks] = useState<NavLinks>(Links);

  /**
   * Display only links marked with topLink flag
   */
  const linkItems = links.map((link) => {
    if (link.topLink === true) {
      return (<TopNavigationLink {...link}></TopNavigationLink >)
    }
  });

  return (
    <Fragment>
      {linkItems}
    </Fragment>
  );
}

export default TopNavigationLinks;