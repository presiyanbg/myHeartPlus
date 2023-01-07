import React from 'react';
import { NavLinkType } from '../../../ts/types';
import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';

const TopNavigationLink = (link: NavLinkType) => {

  // Translations
  const { t } = useTranslation();

  // Handle link click
  const handleClick = () => {
    scrollToElement(SELECTORS.monitor);
  }

  return (
    <NavLink to={link.url} key={uuid()} className={({ isActive }) => (isActive && "selected") + ' navigation__link'} onClick={handleClick}>
      <span className="navigation__link--text">
        <span>{t(link.title)}</span>
      </span>
    </NavLink>
  );
}

export default TopNavigationLink;