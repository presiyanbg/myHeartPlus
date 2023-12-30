'use client';
import AuthenticationServices from "../../../services/authServices/authServices";

import { useContext } from 'react';
import { UserContext } from "../../../context/userContext/userContextProvider";
import { useRouter } from 'next/navigation';

const LoginLogic = () => {
    const auth = AuthenticationServices();
    const router = useRouter();
    const { authenticate } = useContext(UserContext);

    /**
     * Login 
     * 
     * @param params - Auth data 
     */
    const login = async (params: any) => {
        const data = await auth.login(params);

        if (data.token && data.user) {
            // Save data to provider
            authenticate(data.user, data.token, data.medical_profiles);

            // Navigate to home page
            router.push('/');
        }
    }

    return {
        login,
    }

}

export default LoginLogic;