import React, { Fragment, useState } from 'react';
import NavigationLink from './navigationLink';
import Logo from '../../assets/images/logo.png';
import { NavLinks } from '../../ts/types';
import { faHeart, faFileCircleCheck, faUserDoctor, faStaffSnake } from '@fortawesome/free-solid-svg-icons'

const NavigationLinks = () => {
  const [links, setLinks] = useState<NavLinks>([
    {
      title: 'Logo',
      url: '#',
      logo: Logo,
      selected: false,
      icon: faHeart,
    },
    {
      title: 'Home',
      url: '#',
      selected: true,
      icon: faHeart,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },
    {
      title: 'Check',
      url: '#',
      selected: false,
      icon: faFileCircleCheck,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },
    {
      title: 'Contact a doctor',
      url: '#',
      selected: false,
      icon: faUserDoctor,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
    },
    {
      title: 'Recomended',
      url: '#',
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