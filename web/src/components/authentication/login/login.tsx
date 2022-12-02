import React, { useState } from 'react';
import Logo from '../../../assets/images/logo.png';
import LoginLogic from './loginLogic';

type Props = {};

const Login = ({ }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const logic = LoginLogic();

  /**
   * Handle form submit
   * 
   * @param event HTML Form submit event
   */
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Validate credentials
    // if (email.length <= 10 || password.length <= 8) return;

    logic.login({
      email: email,
      password: password
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
      default:
        break
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-4 mt-2 logo logo--lg">
        <img src={Logo} className="" alt="..." />
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

      {/* Password */}
      <div className="form-group mb-4">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => handleInputChange('password', e)} />
        <div id="emailHelp" className="form-text text-end cursor-pointer text-primary-hover">Forgotten password</div>
      </div>

      <br />

      {/* Button submit */}
      <div className="row justify-content-start">
        <div className="col-4">
          <button type="submit" className="w-100  btn btn-primary text-white">Login</button>
        </div>
      </div>
    </form>
  );
}

export default Login;