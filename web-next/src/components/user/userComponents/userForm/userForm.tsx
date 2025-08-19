'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, Select, SelectItem, user } from '@nextui-org/react';
import { UserFormType, UserType, UserRolesType, UserRoleType } from '@/ts/types';
import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { checkSameObjects, setNativeValue } from '@/utils/utils';
import UsersServicesClientServices from '@/services/usersServices/usersServicesClientServices';
import { v4 as uuid } from 'uuid';

type Props = {
    passData: (key: string, data: any) => void,
    submitData: (event: React.SyntheticEvent) => void,
    mode?: 'registration' | 'user-update',
    user?: UserType,
}

const UserForm = (props: Props) => {
    const [formData, setFormData] = useState<UserFormType>({} as UserFormType);
    const [userProfilePicture, setUserProfilePicture] = useState<string | any>();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState<boolean>(false);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [userRoles, setUserRoles] = useState<UserRolesType>([] as UserRolesType);
    const userService = UsersServicesClientServices();
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
        // Registration check
        if (props?.mode == 'registration') {
            const fieldsToCheck = [
                'email',
                'first_name',
                'last_name',
                'password',
                'password_confirmation',
            ];

            let checkIsValid = true;

            fieldsToCheck.forEach(checkKey => {
                if (formData[checkKey] == null || formData[checkKey] == undefined || !formData[checkKey]?.trim()?.length) {
                    checkIsValid = false;
                }
            });

            if (checkIsValid && passwordConfirmInvalid) {
                checkIsValid = false;
            }

            setFormValid(checkIsValid);
        }

        // User update check
        if (props?.mode == 'user-update') {
            const formSpecificData = {
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
            };

            const userSpecificData = {
                email: props.user?.email,
                first_name: props.user?.first_name,
                last_name: props.user?.last_name,
            }

            const sameProfilePicture = (userProfilePicture == `${process.env.NEXT_PUBLIC_API_URL}/${props.user?.image}`);

            setFormValid(!checkSameObjects(formSpecificData, userSpecificData) || !sameProfilePicture);
        }
    }

    // Update form valid on password change
    useEffect(() => {
        checkFormValid();
    }, [formData, passwordConfirmInvalid, userProfilePicture]);

    // Get user data on edit
    useEffect(() => {
        if (!props?.user?.id) return;

        setFormData({
            id: props.user.id,
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            profile_picture: `${process.env.NEXT_PUBLIC_API_URL}/${props.user.image}`,
            role: props.user.role,
        });

        setUserProfilePicture(`${process.env.NEXT_PUBLIC_API_URL}/${props.user.image}`);

        Object.keys(props.user).forEach(key => {
            if (!document.getElementById(key) || !props.user) return;

            setNativeValue(document.getElementById(key), props.user[key as keyof UserType]);
        });
    }, [props]);


    // // Load user roles
    // useEffect(() => {
    //     // Do not load roles on user update
    //     if (props.mode == 'user-update') return;

    //     userService.roles().then((data: any) => {
    //         if (!data?.roles?.length) return;

    //         setUserRoles(data.roles);
    //     });
    // }, []);

    return (
        <form >
            {/* User image */}
            <div className="flex text-center">
                <div className="w-full pt-4 pb-9">
                    <Avatar
                        src={userProfilePicture}
                        showFallback
                        fallback={<FontAwesomeIcon icon={faCamera} className="text-6xl text-foreground pointer-events-none" />}
                        isBordered
                        alt="user profile picture"
                        onClick={() => { handleProfilePictureClick() }}
                        className="h-32 w-32 m-auto cursor-pointer bg-transparent" />

                    <input type="file"
                        className="hidden"
                        id="profile_picture"
                        aria-describedby="profile picture input"
                        onChange={(e) => handleInputChange('profile_picture', e)} />

                    {
                        props.mode == 'user-update' && (
                            <div className="pt-2">
                                <small className="uppercase font-bold">
                                    {props?.user?.role}
                                </small>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Names */}
            <div className="flex pb-4">
                {/* First name */}
                <div className="px-4 w-1/2">
                    <Input type="text"
                        isRequired
                        id="first_name"
                        aria-describedby="First name input"
                        label="First name"
                        color="default"
                        variant="bordered"
                        onChange={(e) => handleInputChange('first_name', e)} />
                </div>

                {/* Last name */}
                <div className="px-4 w-1/2">
                    <Input type="text"
                        isRequired
                        id="last_name"
                        aria-describedby="Last name input"
                        label="Last name"
                        color="default"
                        variant="bordered"
                        onChange={(e) => handleInputChange('last_name', e)} />
                </div>
            </div >

            {/* Email */}
            <div className="flex px-4 pb-4">
                <Input type="email"
                    isRequired
                    id="email"
                    aria-describedby="Email input"
                    label="Email address"
                    color="default"
                    variant="bordered"
                    onChange={(e) => handleInputChange('email', e)} />
            </div >

            {
                !!(props?.mode == 'registration') && (
                    <>
                        {/* Passwords */}
                        <div className="flex">
                            {/* Password */}
                            <div className="px-4 w-1/2" >
                                <Input
                                    isRequired
                                    id="exampleInputPassword1"
                                    label="Password"
                                    aria-describedby="Password input"
                                    color="default"
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
                                    isRequired
                                    isInvalid={passwordConfirmInvalid}
                                    id="password_confirmation"
                                    aria-describedby="Password confirmation input"
                                    label="Confirm Password"
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

                        {/* Roles */}
                        {/* <div className="pb-4 flex pt-4">
                            <div className="px-4 w-1/2">
                                <Select label="Register as"
                                    isRequired
                                    variant="bordered">
                                    {
                                        userRoles?.map((row: UserRoleType) => (
                                            <SelectItem key={uuid()}
                                                value={row.role}
                                                onClick={() => updateFormData('role', row.role)}>
                                                {row.role}
                                            </SelectItem>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div > */}
                    </>
                )
            }

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
        </form>
    );
}

export default UserForm;