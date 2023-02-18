import React from 'react';
import { NavLinkType } from '../../../ts/types';
import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const TopNavigationLink = (link: NavLinkType) => {
  // Translations
  const { t } = useTranslation();

  if (link.logo) {
    return (
      <NavLink to={link.url} key={uuid()}>
        <li className="side-navigation__link side-navigation__link--logo">
          <div className="row w-100">
            <div className="col-8">
              <img src={link.logo} alt="Company logo"></img>
            </div>

            <div className="col-4 d-flex align-items-center justify-content-end p-0">
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
          </div>
        </li>
      </NavLink>
    );
  }

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