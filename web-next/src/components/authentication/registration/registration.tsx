'use client';
import React, { useState } from 'react';
import RegistrationLogic from './registrationLogic';
import UserForm from '../../user/userForm/userForm';
import { UserFormType } from '../../../ts/types';
import { useTranslations } from 'next-intl';

const Registration = () => {
    const [userData, setUserData] = useState<UserFormType>({
        'email': '',
        'first_name': '',
        'last_name': '',
        'password': '',
        'password_confirmation': '',
        'profile_picture': '',
        'role': 'patient',
    });

    const logic = RegistrationLogic();
    const t = useTranslations();

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

        logic.register(userData);
    }

    return (
        <form onSubmit={handleSubmit} className="w-2/3 m-auto">
            <UserForm passData={getUserData} mode='registration' submitData={handleSubmit}></UserForm>
        </form>
    );
}

export default Registration;