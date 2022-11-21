import React, { useState } from 'react';
import {
  BrowserRouter as ReactRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from '../pages/home/home';
import Check from '../pages/check/check';

type Props = {};

const Router = ({ }: Props) => {

  return (
    <ReactRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/check" element={<Check></Check>} />
        <Route path="/doctors" element={<Home></Home>} />
        <Route path="/login" element={<Home></Home>} />
        <Route path="/forum" element={<Home></Home>} />
        <Route path="*" element={<Home></Home>} />
      </Routes>
    </ReactRouter>
  );
}

export default Router;