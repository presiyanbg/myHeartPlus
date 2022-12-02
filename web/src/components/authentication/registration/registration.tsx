import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegistrationLogic from './registrationLogic';

type Props = {};

const Registration = ({ }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [role, setRole] = useState<boolean>(false);

  const logic = RegistrationLogic();

  /**
   * Handle form submit
   * 
   * @param event HTML Form submit event
   */
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Validate credentials
    // if (email.length <= 10 || password.length <= 8) return;

    logic.register({
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password_confirmation: passwordConfirmation,
      role: role ? 'doctor' : 'patient',
    });
  }

  /**
   * Handle input change
   * 
   * @param inputType string
   * @param event HTML input element event
   */
  const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {
    switch (inputType) {
      case 'email':
        setEmail(event.currentTarget.value);
        break;
      case 'password':
        setPassword(event.currentTarget.value);
        break;
      case 'password_confirmation':
        setPasswordConfirmation(event.currentTarget.value);
        break;
      case 'first_name':
        setFirstName(event.currentTarget.value);
        break;
      case 'last_name':
        setLastName(event.currentTarget.value);
        break;
      case 'role':
        setRole(event.currentTarget.checked);
        break;
      default:
        break;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* First name */}
      <div className="form-group mb-3 mt-3">
        <label htmlFor="first_name">First name</label>
        <input type="text"
          className="form-control"
          id="first_name"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => handleInputChange('first_name', e)} />
      </div>

      {/* Last name */}
      <div className="form-group mb-3">
        <label htmlFor="last_name">Last name</label>
        <input type="text"
          className="form-control"
          id="last_name"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => handleInputChange('last_name', e)} />
      </div>

      {/* Email */}
      <div className="form-group mb-3">
        <label htmlFor="email">Email address</label>
        <input type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => handleInputChange('email', e)} />
      </div>

      {/* Passwords */}
      <div className="row mb-3">
        {/* Password */}
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="d-flex align-items-center">Password</label>
            <input type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => handleInputChange('password', e)} />
            <div id="emailHelp" className="form-text d-none">
              <ProgressBar now={30} label={`${30}%`} variant="success" />
            </div>
          </div>

        </div>
        {/* Password confirmation */}
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input type="password"
              className="form-control"
              id="password_confirmation"
              placeholder="Password"
              onChange={(e) => handleInputChange('password_confirmation', e)} />
          </div>
        </div>
      </div>

      <br />

      <div className="row justify-content-start">
        {/* Button submit */}
        <div className="col-4">
          <button type="submit" className="w-100 btn btn-primary text-white">Register</button>
        </div>

        {/* Roles */}
        <div className="col-6">
          <div className="form-check">
            <input className="form-check-input cursor-pointer"
              type="checkbox"
              value=""
              id="role"
              onChange={(e) => handleInputChange('role', e)} />
            <label className="form-check-label cursor-pointer user-select-none" htmlFor="role">
              Doctor registration
            </label>
          </div>
        </div>
      </div>

    </form>
  );
}

export default Registration;