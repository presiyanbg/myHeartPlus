import React, { Fragment, useState } from 'react';
import NavigationLink from './navigationLink';
import Logo from '../../assets/images/logo.png';
import { NavLinks } from '../../ts/types';

const NavigationLinks = () => {
  const [links, setLinks] = useState<NavLinks>([
    {
      title: 'Logo',
      url: 'home1',
      logo: Logo,
      selected: false,
    },
    {
      title: 'Home',
      url: 'home1',
      selected: true,
    },
    {
      title: 'Home 1 ',
      url: 'home2',
      selected: false,
    },
    {
      title: 'Home 2 ',
      url: 'home3',
      selected: false,
    },
    {
      title: 'Home 3 ',
      url: 'home4',
      selected: false,
    },
    {
      title: 'Home 4 ',
      url: 'home5',
      selected: false,
    }
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