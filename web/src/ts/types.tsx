import { IconProp } from '@fortawesome/fontawesome-svg-core';

/* Navigation Types */
type NavLink = {
  url: string,
  title: string,
  icon: IconProp
  topLink: boolean,
  selected: boolean,
  logo?: string,
  context?: string,
};

type NavLinks = Array<NavLink>;

export type {
  NavLink,
  NavLinks
}