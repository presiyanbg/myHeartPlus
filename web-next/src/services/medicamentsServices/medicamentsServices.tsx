import ServerSideApi from "../../api/serverApi";

const MedicamentsServices = () => {
    const api = ServerSideApi();

    const medicamentsList = (page: number = 1) => {
        return api.get(`/medicaments?page=${page}`, undefined, false);
    }

    const medicamentShow = (id: number | string) => {
        return api.get(`/medicaments/view/${id}`, undefined, false);
    }

    return {
        medicamentsList,
        medicamentShow
    }
}

export default MedicamentsServices;