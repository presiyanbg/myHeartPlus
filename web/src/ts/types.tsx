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
  isAuth?: boolean,
};

type NavLinksType = Array<NavLinkType>;

/* User Types */
type UserType = {
  id: number,
  first_name: string,
  last_name: string,
  full_name: string,
  role: string,
  email: string,
  last_activity: string,
  email_verified_at: string,
  created_at: string,
  updated_at: string,
  image: string;
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

/* Health Types */
type HealthCategoryType = {
  id: number,
  title: string,
  description: string,
  bg_color: string,
  font_color: string,
  created_at: string,
  updated_at: string
}

type HealthCategoriesType = Array<HealthCategoryType>;

type HealthTestType = {
  id: number,
  category_id: number,
  doctor_id: number,
  rating: number,
  description: string,
  title: string,
  created_at: string,
  updated_at: string,
  category: HealthCategoryType | any
}

type HealthTestsType = Array<HealthTestType>;

type HealthTestAnswerType = {
  id: number,
  question_id: number,
  next_question_order_number: number,
  prev_question_order_number: number,
  points: number,
  content: string,
}

type HealthTestAnswersType = Array<HealthTestAnswerType>;

type HealthTestQuestionType = {
  id: number,
  order_number: number,
  title: string,
  description: string,
  is_final_question: boolean,
  answers: HealthTestAnswersType,
  final_answer: HealthTestAnswerType | undefined,
}

type HealthTestQuestionsType = Array<HealthTestQuestionType>;

type HealthTestSubmitParamsType = {
  user_id: number | string | undefined,
  test_id: number | string,
  result: number,
  questions_and_answers: HealthTestQuestionsType,
}

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

  HealthCategoryType,
  HealthCategoriesType,

  HealthTestType,
  HealthTestsType,

  HealthTestAnswerType,
  HealthTestAnswersType,

  HealthTestQuestionType,
  HealthTestQuestionsType,

  HealthTestSubmitParamsType,

  PaginationType,
  CacheType,
}