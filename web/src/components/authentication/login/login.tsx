import React from 'react';
import Logo from '../../../assets/images/logo.png';

type Props = {};

const Login = ({ }: Props) => {
  return (
    <form>
      <div className="row mb-4 mt-2 logo logo--lg">
        <img src={Logo} className="" alt="..." />
      </div>

      {/* Email */}
      <div className="form-group mb-3">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>

      {/* Password */}
      <div className="form-group mb-4">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        <div id="emailHelp" className="form-text text-end cursor-pointer text-primary-hover">Forgotten password</div>
      </div>

      <br />

      {/* Button submit */}
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary text-white">Submit</button>
      </div>
    </form>
  );
}

export default Login;