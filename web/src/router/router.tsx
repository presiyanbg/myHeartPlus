import React, { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from '../pages/home/home';
import HealthTestsList from '../pages/healthCheck/healthTestsList/healthTestsList';
import HealthTest from '../pages/healthCheck/healthTest/healthTest';

import Forum from '../pages/forum/forum';
import Authentication from '../pages/authentication/authentication';
import Article from '../pages/article/article';

import DoctorsList from '../pages/doctors/doctorsList/doctorsList';
import DoctorsProfile from '../pages/doctors/doctorsProfile/doctorsProfile';

type Props = {};

const Router = ({ }: Props) => {

  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/check" element={<HealthTestsList></HealthTestsList>} />
      <Route path="/check/:id" element={<HealthTest></HealthTest>} />

      <Route path="/doctors" element={<DoctorsList></DoctorsList>} />
      <Route path="/doctors/:id" element={<DoctorsProfile></DoctorsProfile>} />

      <Route path="/authentication" element={<Authentication></Authentication>} />

      <Route path="/forum" element={<Forum></Forum>} />

      <Route path="/article/:id" element={<Article></Article>} />

      <Route path="*" element={<Home></Home>} />
    </Routes>
  );
}

export default Router;