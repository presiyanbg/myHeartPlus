import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from '../../ts/types';
import { classNames } from '../../utils/utils';

const NavigationLink = (link: NavLink) => {
  /* Logo Link */
  if (link.logo && link.logo) {
    return (
      <li className="navigation__link navigation__link--logo">
        <a href="#">
          <img src={link.logo} alt="Company logo"></img>
        </a>
      </li>
    );
  }

  /* Default Link */
  const linkClasses = classNames('navigation__link', link.selected && 'selected');

  return (
    <li className={linkClasses}>
      <a href={link.url} className='navigation__link--text'>
        <span>{link.title}</span>
      </a>
    </li>
  );
}

export default NavigationLink;