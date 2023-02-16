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

type UserFormType = {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  password_confirmation: string,
  role: boolean,
  profile_picture: File | string,
  [key: string]: any;
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

/* Doctor Types */
type DoctorType = {
  id: number,
  user_id: number,
  rating: number,
  specialty: string,
  mobile_number: string,
  office_number: string,
  address_1: string,
  address_2: string,
  address_3: string,
  address_4: string,
  address_5: string,
  created_at: string,
  updated_at: string,
  description: string,
  full_name: string,
  image: string
}

type DoctorsType = Array<DoctorType>;

/* Cache Types */
type CacheType = {
  [key: string]: any;
}

export type {
  NavLinkType,
  NavLinksType,

  UserType,
  UserFormType,

  ArticleType,
  ArticlesType,

  DoctorType,
  DoctorsType,

  PaginationType,
  CacheType,
}