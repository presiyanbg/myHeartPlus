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
    <>
      <div className="row">
        <div className="col-12">
          {display == 'login' && <Login></Login>}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="text-primary cursor-pointer col-4 text-capitalize" onClick={toggleDisplay}>
            {display == 'register' && 'login'}
            {display == 'login' && 'register'}
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
