import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { UserClass } from '../../../ts/classes';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from '../../../constants/api';

type Props = {
  user: UserClass
};

const TopNavigationDropDown = (props: Props) => {
  // Translations
  const { t } = useTranslation();

  // User data
  const user = props.user;

  return (
    <Dropdown className="navigation__link navigation__link--dropdown" >
      <Dropdown.Toggle variant="" className="navigation__link--dropdown-title">
        {t('Hello')}, {user?.first_name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* User Image */}
        <Dropdown.Item href="#/action-1" className="dropdown--picture">
          <div className="profile--picture mb-3 mt-3">
            <div className="image">
              <img src={SERVER_URL + 'images/users/user-photo__1.jpg'} alt="User photo" />
            </div>
          </div>
        </Dropdown.Item>

        {/* User full name */}
        <Dropdown.Item href="#/action-1">
          <div className="row">
            <div className="col-1">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="col-9">
              {t('Profile page')}
            </div>
          </div>
        </Dropdown.Item>

        {/* Switch to dark/light mode */}
        <Dropdown.Item href="#/action-2">
          <div className="row">
            <div className="col-1">
              <FontAwesomeIcon icon={faMoon} />
            </div>
            <div className="col-9">
              {t('Dark mode')}
            </div>
          </div>
        </Dropdown.Item>

        {/* Logout */}
        <Dropdown.Item href="#/action-3">
          <NavLink to={'/authentication'} className="row">
            <div className="col-1">
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
            <div className="col-9">
              {t('Logout')}
            </div>
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default TopNavigationDropDown;