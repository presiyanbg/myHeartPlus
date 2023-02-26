import Api from "../../api/api";

const UsersServices = () => {
  const api = Api();

  const users = (page: number = 1) => {
    return api.post(`/users?page=${page}`, undefined, false);
  }

  const userShow = (id: number) => {
    return api.post(`/users/view/${id}`, undefined, false);
  }

  return {
    users,
    userShow,
  }
}

export default UsersServices;