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

/* Article Types */
type ArticleType = {
  content: string,
  id: number,
  image: string,
  moment_views: number,
  writer: string,
  shares: number,
  slug: string,
  title: string,
  total_views: number,
  created_at: string,
  updated_at: string,
}

type ArticlesType = Array<ArticleType>;

/* Pagination Types */
type PaginationType = {
  data: any,
  links: any,
  current_page: number,
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number,
  first_page_url: string,
  last_page_url: string,
  next_page_url: string,
  path: string,
  prev_page_url: string,
}

/* Cache Types */
type CacheType = {
  [key: string]: any;
}

export type {
  NavLinkType,
  NavLinksType,
  UserType,
  RegistrationFormType,
  ArticleType,
  ArticlesType,
  PaginationType,
  CacheType
}