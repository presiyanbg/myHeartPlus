import { useState, useEffect, useContext } from "react";
import { SERVER_URL } from "../../constants/api";
import { SELECTORS } from "../../constants/selectors";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../utils/utils';
import { UserContext } from "../../context/userContext/userContextProvider";
import { Nav, Tab } from "react-bootstrap";
import { UserType } from "../../ts/types";

import PageTitle from "../../components/commonComponents/pageTitle/pageTitle";
import ProfileLogic from "./profileLogic";
import DoctorCard from "../../components/doctorComponents/doctorCard/doctorCard";
import ImageLoader from "../../components/loadersComponents/imageLoader/imageLoader";

const Profile = () => {
  const [profile, setProfile] = useState<UserType>();
  const [patientProfile, setPatientProfile] = useState<UserType>();
  const [doctorProfile, setDoctorProfile] = useState<UserType>();

  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const logic = ProfileLogic();


  useEffect(() => {
    if (user != undefined && user.id) {
      logic.loadUser(user).then(userData => {
        if (!userData) return;

        // Save main user profile data
        if (userData.user) {
          setProfile(userData.user);
        }

        // Save user doctor profile data
        if (userData.medical_profiles?.doctor) {
          setDoctorProfile(userData.medical_profiles.doctor)
        }

        // Save user patient profile data
        if (userData.medical_profiles?.patient) {
          setPatientProfile(userData.medical_profiles.patient)
        }

        scrollToElement(`.${SELECTORS.anchorScroll}`);
      });
    }
  }, [user]);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={user.full_name}></PageTitle>

        <Tab.Container id="left-tabs-example" defaultActiveKey="#profile-page">
          <div className="row">
            <div className="col-3">
              {logic.buildNavLinks(profile, doctorProfile, patientProfile)}
            </div>

            <div className="col-9">
              <Tab.Content>
                {/* User profile tab */}
                {
                  profile &&
                  <Tab.Pane eventKey="#profile-page">
                    {profile.full_name}
                    Registered: {profile.created_at}
                    <ImageLoader src={profile?.image} alt={profile.full_name}></ImageLoader>
                  </Tab.Pane>
                }

                {/* Doctor profile tab */}
                {
                  doctorProfile &&
                  <Tab.Pane eventKey="#doctor-page">
                    <DoctorCard doctor={doctorProfile}></DoctorCard>
                  </Tab.Pane>
                }

                {/* Patient profile tab */}
                {
                  patientProfile &&
                  <Tab.Pane eventKey="#patient-page">
                    Patient
                  </Tab.Pane>
                }

                {/* Settings tab */}
                <Tab.Pane eventKey="#settings-page">
                  Settings
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </div>
  )
}

export default Profile;