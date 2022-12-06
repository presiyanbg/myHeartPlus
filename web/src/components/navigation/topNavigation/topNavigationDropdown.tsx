import Dropdown from 'react-bootstrap/Dropdown';
import User from '../../../assets/images/user-photo__1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { UserClass } from '../../../ts/classes';
import { NavLink } from "react-router-dom";

type Props = {
  user: UserClass
};

const TopNavigationDropDown = (props: Props) => {
  const user = props.user;

  return (
    <Dropdown className="navigation__link navigation__link--dropdown" >
      <Dropdown.Toggle variant="" className="navigation__link--dropdown-title">
        Hello, {user?.first_name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* User Image */}
        <Dropdown.Item href="#/action-1" className="dropdown--picture">
          <div className="profile--picture mb-3 mt-3">
            <div className="image">
              <img src={User} alt="User photo" />
            </div>
          </div>
        </Dropdown.Item>

        {/* User full name */}
        <Dropdown.Item href="#/action-1">
          <div className="row">
            <div className="col-3">
              <FontAwesomeIcon icon={faUser} size="xl" />
            </div>
            <div className="col-9">
              Profile
            </div>
          </div>
        </Dropdown.Item>

        {/* Switch to dark/light mode */}
        <Dropdown.Item href="#/action-2">
          <div className="row">
            <div className="col-3">
              <FontAwesomeIcon icon={faMoon} size="xl" />
            </div>
            <div className="col-9">
              Switch mode
            </div>
          </div>
        </Dropdown.Item>

        {/* Logout */}
        <Dropdown.Item href="#/action-3">
          <NavLink to={'/authentication'} className="row">
            <div className="col-3">
              <FontAwesomeIcon icon={faTimesCircle} size="xl" />
            </div>
            <div className="col-9">
              Logout
            </div>
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default TopNavigationDropDown;