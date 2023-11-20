
import ServerSideApi from "../../api/serverApi";

const CommonServices = () => {
    const api = ServerSideApi();

    const healthCategoryShow = (id: number | string) => {
        return api.post(`/health-category/view/${id}`, undefined, false);
    }

    return {
        healthCategoryShow,
    }
}

export default CommonServices;