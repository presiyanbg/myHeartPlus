import React, { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from '../pages/home/home';
import Check from '../pages/check/check';
import Doctors from '../pages/doctors/doctors';
import Forum from '../pages/forum/forum';
import Authentication from '../components/authentication/authentication';

type Props = {};

const Router = ({ }: Props) => {

  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/check" element={<Check></Check>} />
      <Route path="/doctors" element={<Doctors></Doctors>} />
      <Route path="/login" element={<Authentication></Authentication>} />
      <Route path="/forum" element={<Forum></Forum>} />
      <Route path="*" element={<Home></Home>} />
    </Routes>
  );
}

export default Router;