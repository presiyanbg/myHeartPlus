import React from 'react';
import { NavLinkType } from '../../../ts/types';
import { classNames } from '../../../utils/utils';
import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';

const TopNavigationLink = (link: NavLinkType) => {
  /* Default Link */
  return (
    <NavLink to={link.url} key={uuid()} className={({ isActive }) => (isActive && "selected") + ' side-navigation__link'}>
      <li className="side-navigation__link--text">
        {link.title}
      </li>
    </NavLink >
  );
}

export default TopNavigationLink;