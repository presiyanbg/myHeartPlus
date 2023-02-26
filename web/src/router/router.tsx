import React, { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from '../pages/homePage/home';
import HealthTestsList from '../pages/healthTestsPage/healthTestsList/healthTestsList';
import HealthTest from '../pages/healthTestsPage/healthTest/healthTest';

import Forum from '../pages/forumPage/forum';
import Authentication from '../pages/authenticationPage/authentication';
import Article from '../pages/articlePage/article';

import DoctorsList from '../pages/doctorsPage/doctorsList/doctorsList';
import DoctorsProfile from '../pages/doctorsPage/doctorsProfile/doctorsProfile';

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

      <Route path="/users/:id" element={<Article></Article>} />

      <Route path="*" element={<Home></Home>} />
    </Routes>
  );
}

export default Router;