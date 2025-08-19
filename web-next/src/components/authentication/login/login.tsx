'use client';
import React, { useState } from 'react';
import Logo from '../../../assets/images/logo.png';
import LoginLogic from './loginLogic';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';

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
        <form onSubmit={handleSubmit} className="w-1/2 m-auto">
            <div className="w-full pt-4 pb-9">
                <Image src={Logo} className="h-32 w-32 m-auto" alt="myHeartPlus logo" height={1000} width={1000} />
            </div>

            {/* Email */}
            <div className="pt-1 pb-2 flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="email"
                    isRequired
                    id="email"
                    color="default"
                    variant="bordered"
                    label="Enter your email"
                    onChange={(e) => handleInputChange('email', e)} />
            </div>

            {/* Password */}
            <div className="pt-1 pb-2">
                <Input type="password"
                    isRequired
                    id="exampleInputPassword1"
                    color="default"
                    variant="bordered"
                    label="Password"
                    onChange={(e) => handleInputChange('password', e)} />
                <div id="emailHelp" className="pt-2 text-end text-small cursor-pointer hover:text-blue-600">Forgotten password</div>
            </div>

            {/* Button submit */}
            <div className="pb-7 pt-7 text-center">
                <Button type="submit" variant="shadow" color="primary" onClick={(e) => handleSubmit(e)}>Login</Button>
            </div>
        </form>
    );
}

export default Login;