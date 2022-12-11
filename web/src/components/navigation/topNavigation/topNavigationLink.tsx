import React from 'react';
import { NavLinkType } from '../../../ts/types';
import { changeOpacityOnScroll } from '../../../utils/utils';
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

  /* Logo Link */
  if (link.logo && link.logo) {
    const logoRef = React.createRef<HTMLDivElement>();

    changeOpacityOnScroll(logoRef, true, 'opacity');

    return (
      <NavLink to={link.url} key={uuid()} onClick={handleClick}>
        <li className="navigation__link navigation__link--logo" >
          <div ref={logoRef}>
            <img src={link.logo} alt="Company logo"></img>
          </div>
        </li>
      </NavLink>
    );
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