import React from 'react';
import TopNavigationLinks from './topNavigationLinks';
import { changeOpacityOnScroll } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

type Props = {};

const TopNavigation = ({ }: Props) => {
  let navRef = React.createRef<HTMLDivElement>();

  changeOpacityOnScroll(navRef, true, 'opacity', 0.9);

  return (
    <div className="navigation" >
      <div className="navigation__bar" ref={navRef}></div>
      <ul className="navigation__links-wrapper">
        <TopNavigationLinks></TopNavigationLinks>

        <li className='navigation__link'>
          <span className='navigation__link--text'>
            <FontAwesomeIcon icon={faMoon} size="xl" />
          </span>
        </li>
      </ul>
    </div>
  )
}

export default TopNavigation;