import React, { useState } from 'react';
import { NavLinks, NavLink } from '../../ts/types';
import { faHeart, faFileCircleCheck, faUserDoctor, faStaffSnake } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/images/logo.png';

const Links = () => {
  const [links, setLinks] = useState<NavLinks>([
    {
      title: 'Logo',
      url: '/',
      logo: Logo,
      selected: false,
      icon: faHeart,
      topLink: true,
      onClick: () => { },
    },
    {
      title: 'Home',
      url: '/',
      selected: true,
      icon: faHeart,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
      onClick: () => { },
    },
    {
      title: 'Check',
      url: '/check',
      selected: false,
      icon: faFileCircleCheck,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
      onClick: () => { },
    },
    {
      title: 'Contact a doctor',
      url: '/doctors',
      selected: false,
      icon: faUserDoctor,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
      onClick: () => { },
    },
    {
      title: 'Login',
      url: '/authentication',
      selected: false,
      icon: faStaffSnake,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
      onClick: () => { },
    },
    {
      title: 'Forum',
      url: '/forum',
      selected: false,
      icon: faStaffSnake,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: false,
      onClick: () => { },
    },
  ]);

  return {
    links: links,
  }
}

export default Links;