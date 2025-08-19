import React from 'react';
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import AuthenticationPortal from "@/components/authentication/authenticationPortal/authenticationPortal";

const AuthenticationPage = () => {
    return (
        <PageLayout>
            <AuthenticationPortal></AuthenticationPortal>
        </PageLayout>
    );
}

export default AuthenticationPage;
