
/* Navigation Types */
type NavLink = {
  url: string,
  title: string,
  logo?: string,
  selected: boolean
};

type NavLinks = Array<NavLink>;

export type {
  NavLink,
  NavLinks
}