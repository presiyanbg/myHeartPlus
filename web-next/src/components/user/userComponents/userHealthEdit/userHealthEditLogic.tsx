'user client';

import UsersServicesClientServices from "@/services/usersServices/usersServicesClientServices";
import { UserHealthFormType } from "@/ts/types";

const UserHealthEditLogic = () => {
    const userServices = UsersServicesClientServices();

    const updateHealthDetails = async (userId: number, params: UserHealthFormType) => {
        let formData = new FormData();

        formData.append('weight', params.weight?.toString() || '0');
        formData.append('height', params.height?.toString() || '0');
        formData.append('date_of_birth', new Date(params.date_of_birth).toLocaleDateString() || '');
        formData.append('gender', params.gender?.toString() || '');
        formData.append('health_details', params.health_details);

        const data = await userServices.updateHealthDetails(userId, formData);
    }

    return {
        updateHealthDetails
    }
}

export default UserHealthEditLogic;