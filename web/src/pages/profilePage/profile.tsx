import PageTitle from "../../components/commonComponents/pageTitle/pageTitle";
import UserProfile from "../../components/userComponents/userProfile/userProfile";
import ProfileLogic from "./profileLogic";
import DoctorProfile from "../../components/doctorComponents/doctorProfile/doctorProfile";

import { useState, useEffect, useContext } from "react";
import { SERVER_URL } from "../../constants/api";
import { SELECTORS } from "../../constants/selectors";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../utils/utils';
import { UserContext } from "../../context/userContext/userContextProvider";
import { Nav, Tab } from "react-bootstrap";
import { UserType } from "../../ts/types";
import PatientProfile from "../../components/patientComponent/patientProfile/patientProfile";
import PatientStatistic from "../../components/patientComponent/patientStatistic/patientStatistic";
import HealthTestResultsTable from "../../components/healthTestComponents/healthTestResultsTable/healthTestResultsTable";
import DoctorPatients from "../../components/doctorComponents/doctorPatients/doctorPatients";

const Profile = () => {
  const [profile, setProfile] = useState<UserType>();
  const [patientProfile, setPatientProfile] = useState<UserType>();
  const [doctorProfile, setDoctorProfile] = useState<UserType>();

  const logic = ProfileLogic();

  const { t } = useTranslation();
  const { user, isAuth } = useContext(UserContext);

  /**
   * Load user data -- only when authenticated 
   */
  useEffect(() => {
    if (!user?.id || !isAuth) return;

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
  }, [user, isAuth]);

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
                    <UserProfile user={profile}></UserProfile>
                  </Tab.Pane>
                }

                {/* Doctor profile tab */}
                {
                  doctorProfile &&
                  <Tab.Pane eventKey="#doctor-page">
                    <DoctorProfile doctor={doctorProfile}></DoctorProfile>
                  </Tab.Pane>
                }

                {/* Doctor patients tab */}
                {
                  doctorProfile &&
                  <Tab.Pane eventKey="#doctor-patients">
                    <DoctorPatients doctorID={doctorProfile.id}></DoctorPatients>
                  </Tab.Pane>
                }

                {/* Patient profile tab */}
                {
                  patientProfile &&
                  <Tab.Pane eventKey="#patient-page">
                    <PatientProfile patient={patientProfile}></PatientProfile>
                  </Tab.Pane>
                }


                {/* Patient statistics tab */}
                {
                  patientProfile &&
                  <Tab.Pane eventKey="#patient-statistics">
                    <PatientStatistic patient={patientProfile}></PatientStatistic>
                  </Tab.Pane>
                }

                {/* Test results tab */}
                {
                  patientProfile &&
                  <Tab.Pane eventKey="#health-test-results">
                    <HealthTestResultsTable patientID={patientProfile?.id}></HealthTestResultsTable>
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