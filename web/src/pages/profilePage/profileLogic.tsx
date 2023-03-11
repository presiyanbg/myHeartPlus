import UsersServices from "../../services/usersServices/usersServices";

import { Nav } from "react-bootstrap";
import { UserType } from "../../ts/types";
import { PROFILE_NAV_ITEMS } from "../../constants/profileNavItems";
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';

const ProfileLogic = () => {
  const userService = UsersServices();
  const { t } = useTranslation();

  /**
   * Load user data from API
   * 
   * @param user UserType -- Authenticated user
   * @returns user data from API
   */
  const loadUser = async (user: UserType) => {
    const data = await userService.userShow(user.id);

    return data;
  }

  /**
   * Build tab navigation links
   * 
   * @param profile UserType -- User data from API
   * @param doctorProfile UserType -- Doctor data from API
   * @param patientProfile UserType -- Patient data from API
   * @returns HTML
   */
  const buildNavLinks = (profile: UserType | any, doctorProfile: UserType | any, patientProfile: UserType | any) => {
    const profileCheck = profile?.id;
    const doctorCheck = doctorProfile?.id;
    const patientCheck = patientProfile?.id;

    return (
      <Nav variant="pills" className="flex-column">
        {
          PROFILE_NAV_ITEMS.map(item => {
            if (item.require == 'profile' && !profileCheck) return;
            if (item.require == 'doctor' && !doctorCheck) return;
            if (item.require == 'patient' && !patientCheck) return;

            return (
              <Nav.Item key={uuid()} className="profile--nav-item">
                <Nav.Link eventKey={item.eventKey}>{t(item.itemTitle)}</Nav.Link>
              </Nav.Item>
            );
          })
        }
      </Nav>
    );
  }

  return {
    loadUser,
    buildNavLinks,
  }
}

export default ProfileLogic;