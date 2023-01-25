import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext/userContextProvider';
import Login from '../../components/authentication/login/login';
import Logout from '../../components/authentication/logout/logout';
import Registration from '../../components/authentication/registration/registration';

type Props = {};

const Authentication = ({ }: Props) => {
  const [display, setDisplay] = useState<'login' | 'register' | 'logout'>('login');
  const { isAuth } = useContext(UserContext);

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
    <div className="wrapper">
      <div className="page">
        <div className="d-flex flex-column justify-content-between h-100">
          {
            isAuth && <Logout></Logout>
          }
          {
            !isAuth && <>
              <div className="row justify-content-center mb-3">
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
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Authentication;
