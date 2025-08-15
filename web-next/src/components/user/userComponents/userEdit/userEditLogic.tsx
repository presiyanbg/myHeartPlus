import { UserContext } from "@/context/userContext/userContextProvider";
import UsersServicesClientServices from "@/services/usersServices/usersServicesClientServices";
import { UserFormType } from "@/ts/types";
import { useContext } from "react";

const UserEditLogic = () => {
    const userServices = UsersServicesClientServices();
    const { authenticate } = useContext(UserContext);

    const update = async (userId: number, params: UserFormType) => {
        let formData = new FormData();

        formData.append('email', params.email);
        formData.append('first_name', params.first_name);
        formData.append('last_name', params.last_name);
        formData.append('profile_picture', params.profile_picture || '');

        const data = await userServices.update(userId, formData);

        if (data.token && data.user) {
            // Update data to provider
            authenticate(data.user, data.token)
        }
    }

    return {
        update
    }

}

export default UserEditLogic;