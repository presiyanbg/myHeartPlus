import { IconProp } from '@fortawesome/fontawesome-svg-core';

/* Navigation Types */
type NavLinkType = {
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

type NavLinksType = Array<NavLinkType>;

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
  NavLinkType,
  NavLinksType,
  UserType,
  RegistrationFormType
}