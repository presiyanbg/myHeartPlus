import Api from "../../api/serverApi";

const OrganizationsServices = () => {
    const api = Api();

    const organizationsList = async () => {
        return api.get(`/organizations`, undefined, true);
    }

    const organizationDoctors = async (organization_id: number,) => {
        return api.get(`/organizations/${organization_id}/doctors`, undefined, true);
    }

    return {
        organizationsList,
        organizationDoctors,
    }
}

export default OrganizationsServices;