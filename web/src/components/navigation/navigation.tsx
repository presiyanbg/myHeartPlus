import React, { useState } from 'react';
import HeroHome from '../../assets/images/hero__6.jpg';
import NavigationLinks from './navigationLinks';

type Props = {};

const Navigation = ({ }: Props) => {
  const [linkImage, setLinkImage] = useState(HeroHome);

  return (
    <div className="navigation">
      <div className="navigation__head">
        <div className="carousel">
          <div className="carousel-image hero-image">
            <img src={linkImage} alt="Picture of a doctor" />
          </div>
        </div>
      </div>
      <div className="navigation__body navigation__body--expanded">
        <div className="navigation__links-wrapper">
          <NavigationLinks></NavigationLinks>
        </div>
      </div>
    </div>
  )
}

export default Navigation;