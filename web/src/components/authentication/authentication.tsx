import React, { useState } from 'react';
import Login from './login/login';
import Registration from './registration/registration';

type Props = {};

const Authentication = ({ }: Props) => {
  const [display, setDisplay] = useState<'login' | 'register'>('login');

  console.log(display);

  const toggleDisplay = () => {
    setDisplay((prev) => {
      if (prev == 'login') {
        return 'register';
      } else {
        return 'login';
      }
    });
  }

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div className="row justify-content-center">
        <div className="col-8">
          {display == 'login' && <Login></Login>}
          {display == 'register' && <Registration></Registration>}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="cursor-pointer text-capitalize text-center" onClick={toggleDisplay}>
            {display == 'register' && 'Already have a registration? '}
            {display == 'register' && <span className="text-primary text-underline-hover">Login here</span>}

            {display == 'login' && 'New user? '}
            {display == 'login' && <span className="text-primary text-underline-hover">Register here</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
