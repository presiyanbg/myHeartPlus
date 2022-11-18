import React from 'react';
import TopNavigationLinks from './sideNavigationLinks';

type Props = {};

const SideNavigation = ({ }: Props) => {
  return (
    <div className="side-navigation">
      <ul className="side-navigation__links">
        <TopNavigationLinks></TopNavigationLinks>
      </ul>
    </div>
  );
}

export default SideNavigation;