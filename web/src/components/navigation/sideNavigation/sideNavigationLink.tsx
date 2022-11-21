import React from 'react';
import { NavLink } from '../../../ts/types';
import { classNames } from '../../../utils/utils';
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
const TopNavigationLink = (link: NavLink) => {
  const linkClasses = classNames('side-navigation__link', link.selected && 'selected');

  /* Default Link */
  return (
    <Link to={link.url} key={uuid()} className={linkClasses} onClick={() => link.onClick(link)}>
      <li className='side-navigation__link--text'>
        {link.title}
      </li>
    </Link>
  );
}

export default TopNavigationLink;