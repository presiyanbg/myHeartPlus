import React from 'react';
import NavigationLinks from './navigationLinks';

type Props = {};

const Navigation = ({ }: Props) => {
  return (
    <div className="navigation">
      <ul className="navigation__links-wrapper">
        <NavigationLinks></NavigationLinks>
      </ul>
    </div>
  )
}

export default Navigation;