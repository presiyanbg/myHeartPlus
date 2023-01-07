import React, { useContext } from 'react';
import TopNavigationLinks from './topNavigationLinks';
import TopNavigationDropDown from './topNavigationDropdown';
import { UserContext } from '../../../context/userContext/userContextProvider';
import { CommonContext } from '../../../context/commonContext/commonContextProvider';
import { NavLink } from "react-router-dom";
import { NavigationContext } from '../../../context/navigationContext/navigationContextProvider';

type Props = {};

const TopNavigation = ({ }: Props) => {
  let navRef = React.createRef<HTMLDivElement>();
  const { isAuth, user } = useContext(UserContext);
  const { monitorExpanded } = useContext(CommonContext);
  const { logoLink } = useContext(NavigationContext);

  // Hide top navigation when monitor is expanded
  if (monitorExpanded) {
    return (<></>);
  }

  return (
    <div className="navigation" >
      <div className="navigation__links-wrapper">
        <NavLink to={logoLink.url}>
          <li className="navigation__link navigation__link--logo" >
            <div>
              <img src={logoLink.logo} alt="Company logo"></img>
            </div>
          </li>
        </NavLink>

        <ul>
          {/* Default Links */}
          <TopNavigationLinks></TopNavigationLinks>
        </ul>
        {/* User Panel */}
        {isAuth && <TopNavigationDropDown user={user}></TopNavigationDropDown>}
      </div>
    </div>
  )
}

export default TopNavigation;