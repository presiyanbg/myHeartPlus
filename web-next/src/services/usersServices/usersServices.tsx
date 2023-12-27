import ServerSideApi from "../../api/serverApi";

const UsersServices = () => {
    const api = ServerSideApi();

    const users = (page: number = 1) => {
        return api.get(`/users?page=${page}`, undefined, false);
    }

    const userShow = (id: number) => {
        return api.get(`/users/view/${id}`, undefined, false);
    }

    return {
        users,
        userShow,
    }
}

export default UsersServices;