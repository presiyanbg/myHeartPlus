import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

type Props = {};

const Registration = ({ }: Props) => {
  return (
    <form>
      {/* First name */}
      <div className="form-group mb-3 mt-3">
        <label htmlFor="first_name">First name</label>
        <input type="email" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>

      {/* Last name */}
      <div className="form-group mb-3">
        <label htmlFor="last_name">Last name</label>
        <input type="email" className="form-control" id="last_name" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>

      {/* Email */}
      <div className="form-group mb-3">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>

      {/* Passwords */}
      <div className="row mb-3">
        {/* Password */}
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="d-flex align-items-center">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            <div id="emailHelp" className="form-text d-none">
              <ProgressBar now={30} label={`${30}%`} variant="success" />
            </div>
          </div>

        </div>
        {/* Password confirmation */}
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input type="password" className="form-control" id="password_confirmation" placeholder="Password" />
          </div>
        </div>
      </div>

      <br />

      {/* Button submit */}
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary text-white">Submit</button>
      </div>
    </form>
  );
}

export default Registration;