import React, { useContext } from 'react';
import TopNavigationLinks from './topNavigationLinks';
import TopNavigationDropDown from './topNavigationDropdown';
import { changeOpacityOnScroll } from '../../../utils/utils';
import { UserContext } from '../../../context/userContext/userContextProvider';
import { CommonContext } from '../../../context/commonContext/commonContextProvider';

type Props = {};

const TopNavigation = ({ }: Props) => {
  let navRef = React.createRef<HTMLDivElement>();
  const { isAuth, user } = useContext(UserContext);
  const { monitorExpanded } = useContext(CommonContext);

  changeOpacityOnScroll(navRef, true, 'opacity', 0.9);

  // Hide top navigation when monitor is expanded
  if (monitorExpanded) {
    return (<></>);
  }

  return (
    <div className="navigation" >
      <div className="navigation__bar" ref={navRef}></div>
      <ul className="navigation__links-wrapper">
        {/* Default Links */}
        <TopNavigationLinks></TopNavigationLinks>

        {/* User Panel */}
        {isAuth && <TopNavigationDropDown user={user}></TopNavigationDropDown>}
      </ul>
    </div>
  )
}

export default TopNavigation;