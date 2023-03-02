import React, { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from '../pages/homePage/home';

import Authentication from '../pages/authenticationPage/authentication';
import Profile from '../pages/profilePage/profile';

import Forum from '../pages/forumPage/forum';

import Article from '../pages/articlePage/article';

import DoctorsList from '../pages/doctorsPage/doctorsList/doctorsList';
import DoctorsProfile from '../pages/doctorsPage/doctorsProfile/doctorsProfile';

import HealthTestsList from '../pages/healthTestsPage/healthTestsList/healthTestsList';
import HealthTest from '../pages/healthTestsPage/healthTest/healthTest';

import Prescription from '../pages/prescriptionsPage/prescription/prescription';
import PrescriptionsList from '../pages/prescriptionsPage/prescriptionsList/prescriptionsList';

type Props = {};

const Router = ({ }: Props) => {

  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />

      <Route path="/health-tests" element={<HealthTestsList></HealthTestsList>} />
      <Route path="/health-tests/:id" element={<HealthTest></HealthTest>} />

      <Route path="/doctors" element={<DoctorsList></DoctorsList>} />
      <Route path="/doctors/:id" element={<DoctorsProfile></DoctorsProfile>} />

      <Route path="/authentication" element={<Authentication></Authentication>} />

      <Route path="/forum" element={<Forum></Forum>} />

      <Route path="/articles/:id" element={<Article></Article>} />

      <Route path="/prescriptions" element={<PrescriptionsList></PrescriptionsList>}></Route>
      <Route path="/prescriptions/:id" element={<Prescription></Prescription>}></Route>

      <Route path="/users/profile" element={<Profile></Profile>} />

      <Route path="*" element={<Home></Home>} />
    </Routes>
  );
}

export default Router;