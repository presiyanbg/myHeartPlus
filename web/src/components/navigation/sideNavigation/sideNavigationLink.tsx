import React from 'react';
import { NavLink } from '../../../ts/types';
import { classNames } from '../../../utils/utils';

const TopNavigationLink = (link: NavLink) => {
  /* Default Link */
  const linkClasses = classNames('side-navigation__link', link.selected && 'selected');

  return (
    <li className={linkClasses}>
      <a href={link.url} className='side-navigation__link--text'>
        <span>{link.title}</span>
      </a>
    </li>
  );
}

export default TopNavigationLink;