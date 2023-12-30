'use client';
import AuthenticationServices from "../../../services/authServices/authServices";
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext/userContextProvider';
import { useRouter } from 'next/navigation';
import { UserFormType } from '../../../ts/types';

const RegistrationLogic = () => {
    const auth = AuthenticationServices();
    const router = useRouter()
    const { authenticate } = useContext(UserContext);

    const register = async (params: UserFormType) => {
        let formData = new FormData();

        formData.append('email', params.email);
        formData.append('first_name', params.first_name);
        formData.append('last_name', params.last_name);
        formData.append('password', params.password || '');
        formData.append('password_confirmation', params.password_confirmation || '');
        formData.append('role', params.role ? 'doctor' : 'patient');
        formData.append('profile_picture', params.profile_picture);

        const data = await auth.register(formData);

        if (data.token && data.user) {
            // Save data to provider
            authenticate(data.user, data.token, data.medical_profiles);

            // Navigate to home page
            router.push('/');
        }
    }

    return {
        register
    }
}

export default RegistrationLogic;