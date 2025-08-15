'use client';

import { UserContext } from "@/context/userContext/userContextProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Portal = () => {
    const { isAuth } = useContext(UserContext);
    const router = useRouter();

    if (!isAuth) {
        router.push('/authentication');
    }

    if (isAuth) {
        router.push('/users/health');
    }

    return (
        <></>
    );
}

export default Portal;