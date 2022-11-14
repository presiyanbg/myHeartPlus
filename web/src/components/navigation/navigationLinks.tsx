import React, { Fragment, useState } from 'react';
import NavigationLink from './navigationLink';
import Logo from '../../assets/images/logo.png';
import { NavLinks } from '../../ts/types';
import { faHeart, faFileCircleCheck, faUserDoctor, faStaffSnake } from '@fortawesome/free-solid-svg-icons'

const NavigationLinks = () => {
  const [links, setLinks] = useState<NavLinks>([
    {
      title: 'Logo',
      url: 'home1',
      logo: Logo,
      selected: false,
      icon: faHeart,
    },
    {
      title: 'Home',
      url: 'home1',
      selected: true,
      icon: faHeart,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },
    {
      title: 'Check',
      url: 'home2',
      selected: false,
      icon: faFileCircleCheck,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },
    {
      title: 'Contact a doctor',
      url: 'home3',
      selected: false,
      icon: faUserDoctor,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },
    {
      title: 'Recomended',
      url: 'home4',
      selected: false,
      icon: faStaffSnake,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },

  ]);

  const linkItems = links.map((link) => {
    return (<NavigationLink {...link}></NavigationLink >)
  });

  return (
    <Fragment>
      {linkItems}
    </Fragment>
  );
}

export default NavigationLinks;