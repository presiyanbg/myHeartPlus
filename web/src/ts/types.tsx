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
  onClick: Function,
  authentication?: boolean
};

type NavLinks = Array<NavLink>;

/* User Types */
type UserType = {
  email: string,
  first_name: string,
  last_name: string,
}

type RegistrationFormType = {
  first_name: string,
  last_name: string,
}

export type {
  NavLink,
  NavLinks,
  UserType,
  RegistrationFormType
}