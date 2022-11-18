import React from 'react';
import TopNavigationLinks from './topNavigationLinks';
import { changeOpacityOnScroll } from '../../../utils/utils';

type Props = {};

const TopNavigation = ({ }: Props) => {
  let navRef = React.createRef<HTMLDivElement>();

  changeOpacityOnScroll(navRef, true, 'opacity', 0.9);

  return (
    <div className="navigation" >
      <div className='navigation__bar' ref={navRef}></div>
      <ul className="navigation__links-wrapper">
        <TopNavigationLinks></TopNavigationLinks>
      </ul>
    </div>
  )
}

export default TopNavigation;