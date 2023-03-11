import ImageLoader from "../../loadersComponents/imageLoader/imageLoader";

import { UserType } from "../../../ts/types";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";

type Props = {
  user: UserType | any,
}

const UserProfile = (props: Props) => {
  const [user, setUser] = useState<UserType>();

  const { t } = useTranslation();


  const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {

  }

  const handleSubmit = (type: string, event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  useEffect(() => {
    if (!props.user) return;

    setUser(props.user);
  }, [props]);

  if (!props.user || !user) return <></>;

  return (
    <div className="row">
      {/* Data Form */}
      <form autoComplete="off" onSubmit={(event) => handleSubmit('data', event)} className="col-12">
        {/* Profile picture */}
        <div className="form-group mb-5 mt-3 text-center user-form--field">
          <div className="user-form--profile--picture">
            <ImageLoader src={user?.image} alt={user?.full_name}></ImageLoader>

            <input type="file"
              className="form-control"
              id="profile_picture"
              aria-describedby="emailHelp"
              placeholder="Profile picture"
              onChange={(e) => handleInputChange('profile_picture', e)} />
          </div>
        </div>

        {/* Email */}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-lg-8">
            <div className="form-floating mb-3">
              <input type="email"
                id="email"
                value={user?.email}
                placeholder={user?.email}
                className="form-control"
                onChange={(e) => handleInputChange('email', e)} />

              <label htmlFor="email">{t('Email')}</label>
            </div>
          </div>
        </div>

        {/* User name */}
        <div className="row justify-content-center mb-3">
          {/* First name */}
          <div className="col-12 col-lg-4 text-end">
            <div className="form-floating mb-3">
              <input type="first_name"
                id="first_name"
                value={user?.first_name}
                placeholder={user?.first_name}
                className="form-control"
                onChange={(e) => handleInputChange('first_name', e)} />

              <label htmlFor="first_name">{t('First name')}</label>
            </div>
          </div>

          {/* Last name */}
          <div className="col-12 col-lg-4">
            <div className="form-floating mb-3">
              <input type="last_name"
                id="last_name"
                value={user?.last_name}
                placeholder={user?.last_name}
                className="form-control"
                onChange={(e) => handleInputChange('last_name', e)} />

              <label htmlFor="last_name">{t('Last name')}</label>
            </div>
          </div>
        </div>

        {/* Update basic data button */}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-lg-4"></div>

          <div className="col-12 col-lg-4">
            <button type="submit" className="btn btn-success text-white w-100">
              {t('Update')}
            </button>
          </div>
        </div>
      </form>

      {/* Separator */}
      <div className="col-12 mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <hr />
          </div>
        </div>
      </div>

      {/* Password Form */}
      <form autoComplete="off" onSubmit={(event) => handleSubmit('password', event)} className="col-12 mb-4">
        {/* Title */}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-lg-4">
            <h5>{t('Change password')}</h5>
          </div>
          <div className="col-12 col-lg-4"></div>
        </div>

        <div className="row justify-content-center mb-3">
          {/* Password */}
          <div className="col-12 col-lg-4 text-end">
            <div className="form-floating mb-3">
              <input type="password"
                id="password"
                className="form-control"
                onChange={(e) => handleInputChange('password', e)} />

              <label htmlFor="password">{t('Password')}</label>
            </div>
          </div>

          {/* Password confirmation */}
          <div className="col-12 col-lg-4 text-end">
            <div className="form-floating mb-3">
              <input type="password"
                id="password_confirmation"
                className="form-control"
                onChange={(e) => handleInputChange('password_confirmation', e)} />

              <label htmlFor="password_confirmation">{t('Confirm password')}</label>
            </div>
          </div>
        </div>

        {/* Update password button */}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-lg-4"></div>

          <div className="col-12 col-lg-4">
            <button type="submit" className="btn btn-warning text-white w-100">
              {t('Update')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserProfile;