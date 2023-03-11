import React, { useState } from 'react';
import RegistrationLogic from './registrationLogic';
import UserForm from '../../userComponents/userForm/userForm';

import { UserFormType } from '../../../ts/types';

const Registration = () => {
  const [userData, setUserData] = useState<UserFormType>({
    'email': '',
    'first_name': '',
    'last_name': '',
    'password': '',
    'password_confirmation': '',
    'profile_picture': '',
    'role': false,
  });

  const logic = RegistrationLogic();

  /**
   * Get user fields data 
   * 
   * @param key string
   * @param data any
   */
  const getUserData = (key: string, data: any) => {
    setUserData((prev: UserFormType) => {
      prev[key] = data;
      return prev;
    });
  }

  /**
   * Handle form submit
   * 
   * @param event HTML Form submit event
   */
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Validate credentials
    // if (email.length <= 10 || password.length <= 8) return;

    logic.register(userData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <UserForm passData={getUserData}></UserForm>

      <br />

      <div className="row justify-content-start">
        {/* Button submit */}
        <div className="col-4">
          <button type="submit" className="w-100 btn btn-primary text-white">Register</button>
        </div>
      </div>
    </form>
  );
}

export default Registration;