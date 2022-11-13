import { NavLink } from '../../ts/types';
import { classNames } from '../../utils/utils';

const NavigationLink = (link: NavLink) => {
  /* Logo Link */
  if (link.logo && link.logo) {
    return (
      <div className="navigation__link navigation__link--logo">
        <img src={link.logo} alt="Company logo"></img>
      </div>
    );
  }

  /* Default Link */
  const linkClasses = classNames('navigation__link', link.selected && 'selected');

  return (
    <a href={link.url} className={linkClasses}>
      <span>{link.title}</span>
    </a>
  );
}

export default NavigationLink;