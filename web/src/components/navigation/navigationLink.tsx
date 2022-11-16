import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from '../../ts/types';
import { classNames, changeOpacityOnScroll } from '../../utils/utils';

const NavigationLink = (link: NavLink) => {
  /* Logo Link */
  if (link.logo && link.logo) {
    let logoRef = React.createRef<HTMLDivElement>();

    changeOpacityOnScroll(logoRef, true, 'opacity');

    return (
      <li className="navigation__link navigation__link--logo" >
        <div ref={logoRef}>
          <img src={link.logo} alt="Company logo"></img>
        </div>
      </li>
    );
  }

  /* Default Link */
  const linkClasses = classNames('navigation__link', link.selected && 'selected');

  return (
    <li className={linkClasses}>
      <a href={link.url} className='navigation__link--text'>
        <span>{link.title}</span>
      </a>
    </li>
  );
}

export default NavigationLink;