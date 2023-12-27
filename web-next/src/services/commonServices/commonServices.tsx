
import ServerSideApi from "../../api/serverApi";

const CommonServices = () => {
    const api = ServerSideApi();

    const healthCategoryShow = (id: number | string) => {
        return api.get(`/health-category/view/${id}`, undefined, false);
    }

    return {
        healthCategoryShow,
    }
}

export default CommonServices;