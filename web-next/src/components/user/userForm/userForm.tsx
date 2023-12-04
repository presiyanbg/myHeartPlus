'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, Input } from '@nextui-org/react';
import { UserFormType } from '@/ts/types';
import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

type Props = {
    passData: (key: string, data: any) => void,
    submitData: (event: React.SyntheticEvent) => void,
    mode?: 'registration' | 'user-update'
}

const useForm = (props: Props) => {
    const [formData, setFormData] = useState<UserFormType>({} as UserFormType);
    const [userProfilePicture, setUserProfilePicture] = useState<string | any>();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState<boolean>(false);
    const [formValid, setFormValid] = useState<boolean>(false);
    const t = useTranslations();

    /**
     * Handle input change
     * 
     * @param inputType string
     * @param event HTML input element event
     */
    const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {
        if (!props || !props.passData) return;
        let data: any = event?.currentTarget?.value;

        switch (inputType) {
            case 'password':
                setPasswordConfirmInvalid(event.currentTarget.value != formData['password_confirmation']);
                break;

            case 'password_confirmation':
                setPasswordConfirmInvalid(event.currentTarget.value != formData['password']);
                break;

            case 'role':
                data = event.currentTarget.checked ? 'doctor' : 'patient';
                break;

            case 'profile_picture':
                if (event.currentTarget?.files && event.currentTarget?.files[0]) {
                    data = event.currentTarget?.files[0];
                    setUserProfilePicture(window.URL.createObjectURL(event.currentTarget.files[0]));
                } else {
                    data = '';
                }
                break;

            default:
                break;
        }

        props.passData(inputType, data);
        updateFormData(inputType, data);
        checkFormValid();
    }

    /**
     * Update locale form data
     * 
     * @param key string - Input key / id 
     * @param value any - Input value
     */
    const updateFormData = (key: string, value: any) => {
        setFormData((prev) => {
            prev = prev || {};

            prev[key] = value;

            return prev;
        });
    }

    /**
     * Handle form submit 
     * 
     * @param event React.SyntheticEvent
     */
    const handleSubmit = (event: React.SyntheticEvent) => {
        checkFormValid();

        if (!formValid) return;

        props?.submitData(event);
    }

    /**
     * Pass trough click from Avatar to profile picture input 
     */
    const handleProfilePictureClick = () => {
        const imageInput = document.getElementById('profile_picture');

        !!imageInput && imageInput?.click();
    }

    /**
     * Check is form data is valid
     * Enable submit button
     */
    const checkFormValid = () => {
        const fieldsToCheck = [
            'email',
            'first_name',
            'last_name',
            'password',
            'password_confirmation',
        ];

        // Registration check
        if (props?.mode == 'registration') {
            let checkIsValid = true;

            fieldsToCheck.forEach(checkKey => {
                if (formData[checkKey] == null || formData[checkKey] == undefined || !formData[checkKey]?.length) {
                    checkIsValid = false;
                }
            });

            if (checkIsValid && passwordConfirmInvalid) {
                checkIsValid = false;
            }

            setFormValid(checkIsValid);
        }

        // User update check
        if (props?.mode == 'user-update' && (formData['password'] || formData['password_confirmation'])) {
            setFormValid(!passwordConfirmInvalid);
        }
    }

    // Update form valid on password change
    useEffect(() => {
        checkFormValid();
    }, [formData, passwordConfirmInvalid]);

    return (
        <>
            {/* User image */}
            <div className="flex text-center">
                <div className="w-full pt-4 pb-9">
                    <Avatar
                        src={userProfilePicture}
                        showFallback
                        fallback={
                            <FontAwesomeIcon icon={faCamera} className="text-6xl text-foreground pointer-events-none" />

                        }
                        isBordered
                        alt="user profile picture"
                        onClick={() => { handleProfilePictureClick() }}
                        className="h-32 w-32 m-auto cursor-pointer bg-transparent" />

                    <input type="file"
                        className="hidden"
                        id="profile_picture"
                        aria-describedby="profile picture input"
                        placeholder="Profile picture"
                        onChange={(e) => handleInputChange('profile_picture', e)} />
                </div>
            </div>

            {/* Names */}
            <div className="flex pb-4">
                {/* First name */}
                <div className="px-4 w-1/2">
                    <Input type="text"
                        id="first_name"
                        aria-describedby="first name input"
                        placeholder="First name"
                        color="primary"
                        variant="bordered"
                        onChange={(e) => handleInputChange('first_name', e)} />
                </div>

                {/* Last name */}
                <div className="px-4 w-1/2">
                    <Input type="text"
                        id="last_name"
                        aria-describedby="last name input"
                        placeholder="Last name"
                        color="primary"
                        variant="bordered"
                        onChange={(e) => handleInputChange('last_name', e)} />
                </div>
            </div >

            {/* Email */}
            <div className="flex px-4 pb-4">
                <Input type="email"
                    id="email"
                    aria-describedby="email input"
                    placeholder="Email address"
                    color="primary"
                    variant="bordered"
                    onChange={(e) => handleInputChange('email', e)} />
            </div >

            {/* Passwords */}
            <div className="flex">
                {/* Password */}
                <div className="px-4 w-1/2" >
                    <Input
                        id="exampleInputPassword1"
                        placeholder="Password"
                        aria-describedby="password input"
                        color="primary"
                        variant="bordered"
                        onChange={(e) => handleInputChange('password', e)}
                        type={passwordVisible ? "text" : "password"}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                                {passwordVisible ? (
                                    <FontAwesomeIcon icon={faEye} className="text-gray-500 pointer-events-none" />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} className="text-gray-500 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                </div >

                {/* Password confirmation */}
                <div className="px-4 w-1/2" >
                    <Input
                        isInvalid={passwordConfirmInvalid}
                        id="password_confirmation"
                        aria-describedby="password confirmation input"
                        placeholder="Confirm Password"
                        variant="bordered"
                        onChange={(e) => handleInputChange('password_confirmation', e)}
                        type={passwordVisible ? "text" : "password"}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                                {passwordVisible ? (
                                    <FontAwesomeIcon icon={faEye} className="text-gray-500 pointer-events-none" />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} className="text-gray-500 pointer-events-none" />
                                )}
                            </button>
                        } />
                </div >
            </div>

            <div className="pb-4 flex pt-4">
                {/* Roles */}
                <div className="px-4 w-1/2 pt-6">
                    <Checkbox className="cursor--pointer"
                        type="checkbox"
                        value=""
                        id="role"
                        color="primary"
                        aria-describedby="doctor registration check"
                        onChange={(e) => handleInputChange('role', e)}>
                        Doctor registration
                    </Checkbox>
                </div>
            </div >

            <br />

            <div className="pb-7 pt-7 text-center">
                {/* Button submit */}
                <div className="col-4">
                    <Button
                        variant="shadow"
                        color={formValid ? 'primary' : 'default'}
                        className={!formValid ? 'cursor-default' : ''}
                        onClick={(e) => handleSubmit(e)}>
                        {props?.mode == 'registration' ? t('Register') : t('Update')}
                    </Button>
                </div>
            </div>
        </>);
}

export default useForm;