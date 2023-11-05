import Dropdown from 'react-bootstrap/Dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { UserClass } from '../../../ts/classes';
import { Link } from "react-router-dom";
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
        <Dropdown className="navigation__link navigation__link--dropdown-wrapper" drop="down" align="end">
            {/* User Image */}
            <Dropdown.Toggle variant="" className="navigation__link navigation__link--picture navigation__link--picture-profile">
                <div className="image">
                    <img src={SERVER_URL + user?.image} alt="User photo" />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="navigation__link--dropdown">
                {/* User full name */}
                <Link to={"/users/profile"}>
                    <div className="row dropdown-link">
                        <div className="col-4 dropdown-link--icon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="col-8 dropdown-link--content">
                            {t('Profile page')}
                        </div>
                    </div>
                </Link>

                {/* Switch to dark/light mode */}
                <Link to={"#/action-1"}>
                    <div className="row dropdown-link">
                        <div className="col-4 dropdown-link--icon">
                            <FontAwesomeIcon icon={faMoon} />
                        </div>
                        <div className="col-8 dropdown-link--content">
                            {t('Dark mode')}
                        </div>
                    </div>
                </Link>

                {/* Logout */}
                <Link to={'/authentication'}>
                    <div className="row dropdown-link">
                        <div className="col-4 dropdown-link--icon">
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                        <div className="col-8 dropdown-link--content">
                            {t('Logout')}
                        </div>
                    </div>
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default TopNavigationDropDown;