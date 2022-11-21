import React from 'react';
import { NavLink } from '../../../ts/types';
import { classNames, changeOpacityOnScroll } from '../../../utils/utils';
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';

const TopNavigationLink = (link: NavLink) => {
  /* Logo Link */
  if (link.logo && link.logo) {
    const logoRef = React.createRef<HTMLDivElement>();

    changeOpacityOnScroll(logoRef, true, 'opacity');

    return (
      <Link to={link.url} key={uuid()}>
        <li className="navigation__link navigation__link--logo" >
          <div ref={logoRef}>
            <img src={link.logo} alt="Company logo"></img>
          </div>
        </li>
      </Link>
    );
  }

  /* Default Link */
  const linkClasses = classNames('navigation__link', link.selected && 'selected');

  return (
    <Link to={link.url} key={uuid()} className={linkClasses} onClick={() => link.onClick(link)}>
      <span className='navigation__link--text'>
        <span>{link.title}</span>
      </span>
    </Link>
  );
}

export default TopNavigationLink;