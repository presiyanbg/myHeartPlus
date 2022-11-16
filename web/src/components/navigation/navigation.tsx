import React from 'react';
import NavigationLinks from './navigationLinks';
import { changeOpacityOnScroll } from '../../utils/utils';

type Props = {};

const Navigation = ({ }: Props) => {
  let navRef = React.createRef<HTMLDivElement>();

  changeOpacityOnScroll(navRef, true, 'opacity');

  return (
    <div className="navigation" >
      <div className='navigation__bar' ref={navRef}></div>
      <ul className="navigation__links-wrapper">
        <NavigationLinks></NavigationLinks>
      </ul>
    </div>
  )
}

export default Navigation;