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
  authentication?: boolean,
  isAuth?: boolean
};

type NavLinksType = Array<NavLinkType>;

/* User Types */
type UserType = {
  id: string,
  first_name: string,
  last_name: string,
  full_name: string,
  role: string,
  email: string,
  last_activity: string,
  email_verified_at: string,
  created_at: string,
  updated_at: string,
}

type RegistrationFormType = {
  first_name: string,
  last_name: string,
}

type Article = {
  content: string,
  created_at: string,
  id: number,
  image: string,
  moment_views: number,
  shares: number,
  slug: string,
  title: string,
  total_views: number,
  updated_at: string,
}

type Articles = Array<Article>;

export type {
  NavLinkType,
  NavLinksType,
  UserType,
  RegistrationFormType,
  Article,
  Articles,
}