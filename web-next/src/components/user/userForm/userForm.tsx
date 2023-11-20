'use client';
import React, { useState } from 'react';
import Logo from '../../../assets/images/logo.png';
import { Progress } from '@nextui-org/react';
import Image from 'next/image';

type Props = {
    passData: (key: string, data: any) => void
}

const useForm = (props: Props) => {
    const [userProfilePicture, setUserProfilePicture] = useState<string | any>();

    /**
     * Handle input change
     * 
     * @param inputType string
     * @param event HTML input element event
     */
    const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {
        if (!props || !props.passData) return;

        switch (inputType) {
            case 'email':
                props.passData(inputType, event.currentTarget.value);
                break;
            case 'password':
                props.passData(inputType, event.currentTarget.value);
                break;
            case 'password_confirmation':
                props.passData(inputType, event.currentTarget.value);
                break;
            case 'first_name':
                props.passData(inputType, event.currentTarget.value);
                break;
            case 'last_name':
                props.passData(inputType, event.currentTarget.value);
                break;
            case 'role':
                props.passData(inputType, event.currentTarget.checked);
                break;
            case 'profile_picture':
                if (event.currentTarget?.files) {
                    props.passData(inputType, event.currentTarget?.files[0]);
                    setUserProfilePicture(URL.createObjectURL(event.currentTarget.files[0]));
                }
                break
            default:
                break;
        }
    }

    return (
        <>
            {/* User image */}
            <div className="form-group mb-3 mt-3 text-center user-form--field">
                <div className="user-form--profile-picture">
                    <Image src={userProfilePicture || Logo} alt="" className="image" />

                    <input type="file"
                        className="form-control"
                        id="profile_picture"
                        aria-describedby="emailHelp"
                        placeholder="Profile picture"
                        onChange={(e) => handleInputChange('profile_picture', e)} />
                </div>

                <label htmlFor="profile_picture">Profile picture</label>
            </div>

            {/* First name */}
            <div className="form-group mb-3 mt-3" >
                <label htmlFor="first_name">First name</label>
                <input type="text"
                    className="form-control"
                    id="first_name"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(e) => handleInputChange('first_name', e)} />
            </div >

            {/* Last name */}
            <div className="form-group mb-3" >
                <label htmlFor="last_name">Last name</label>
                <input type="text"
                    className="form-control"
                    id="last_name"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(e) => handleInputChange('last_name', e)} />
            </div >

            {/* Email */}
            <div className="form-group mb-3" >
                <label htmlFor="email">Email address</label>
                <input type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(e) => handleInputChange('email', e)} />
            </div >

            {/* Passwords */}
            <div className="row mb-3" >
                {/* Password */}
                <div className="col-6" >
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="d-flex align-items-center">Password</label>
                        <input type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={(e) => handleInputChange('password', e)} />
                        <div id="emailHelp" className="form-text d-none">
                            <Progress value={30} label={`${30}%`} color="success" />
                        </div>
                    </div>

                </div >

                {/* Password confirmation */}
                <div className="col-6" >
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input type="password"
                            className="form-control"
                            id="password_confirmation"
                            placeholder="Password"
                            onChange={(e) => handleInputChange('password_confirmation', e)} />
                    </div>
                </div >

                {/* Roles */}
                <div className="col-6" >
                    <div className="form-check">
                        <input className="form-check-input cursor--pointer"
                            type="checkbox"
                            value=""
                            id="role"
                            onChange={(e) => handleInputChange('role', e)} />
                        <label className="form-check-label cursor--pointer user-select-none" htmlFor="role">
                            Doctor registration
                        </label>
                    </div>
                </div >
            </div>
        </>);
}

export default useForm;