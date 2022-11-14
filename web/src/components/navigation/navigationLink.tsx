import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <div className='navigation__link--content'>
        <div className="navigation__link--text">
          <span>{link.title}</span>
        </div>
        <div className="navigation__link--head">
          <h5>{link.title}</h5>
        </div>
        <div className="navigation__link--body">
          <FontAwesomeIcon icon={link.icon} size="4x" />
        </div>
        <div className="navigation__link--footer text-ellipsis--2" >
          <p>{link.context}</p>
        </div>
      </div>
    </a>
  );
}

export default NavigationLink;