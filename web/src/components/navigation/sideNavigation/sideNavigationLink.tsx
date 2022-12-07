import React from 'react';
import { NavLinkType } from '../../../ts/types';
import { classNames } from '../../../utils/utils';
import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next'

const TopNavigationLink = (link: NavLinkType) => {
  // Translations
  const { t } = useTranslation();

  /* Default Link */
  return (
    <NavLink to={link.url} key={uuid()} className={({ isActive }) => (isActive && "selected") + ' side-navigation__link'}>
      <li className="side-navigation__link--text">
        {t(link.title)}
      </li>
    </NavLink >
  );
}

export default TopNavigationLink;