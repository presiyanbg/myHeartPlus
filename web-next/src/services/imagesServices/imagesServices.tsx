import ServerSideApi from "../../api/serverApi";

const ImagesServices = () => {
    const api = ServerSideApi();

    const getBanners = () => {
        return api.get(`/banners`, undefined, false);
    }

    return {
        getBanners,
    }
}

export default ImagesServices;