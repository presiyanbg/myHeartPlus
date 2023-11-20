'use client';
import AuthenticationServices from "../../../services/authServices/authServices";

import { useContext } from 'react';
import { UserContext } from "../../../context/userContext/userContextProvider";

const LogoutLogic = () => {
    const auth = AuthenticationServices();
    const { renounce } = useContext(UserContext);

    /**
     * Logout
     */
    const logout = () => {
        // API Logout
        auth.logout().then(() => {

            // Context Logout 
            renounce();
        });
    }

    return {
        logout,
    }
}

export default LogoutLogic;