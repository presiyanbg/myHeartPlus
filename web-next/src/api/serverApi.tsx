
const ServerSideApi = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = '';

    /**
     * POST data to API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param loadCache boolean - Flag if data can be cached 
     * 
     * @returns object - Api response data
     */
    const post = async (url: string, data?: {}, loadCache: boolean = true) => {
        return await request('POST', url, data, loadCache);
    }

    /**
     * GET data from API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param loadCache boolean - Flag if data can be cached 
     * 
     * @returns object - Api response data
     */
    const get = async (url: string, data?: {}, loadCache: boolean = true) => {
        return await request('GET', url, data, loadCache);
    }

    /**
     * Request data from API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param loadCache boolean - Flag if data can be cached 
     * @param method string - Set method type  
     * 
     * @returns object - Api response data
     */
    const request = async (method: 'GET' | 'POST', url: string, data?: {}, loadCache: boolean = true) => {
        try {
            const config = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(data),
            } as RequestInit;

            // Load cached data
            if (loadCache) {
                config.next = { revalidate: 3600 };
            }

            // Load new data
            if (!loadCache) {
                config.cache = 'no-store';
            }

            const response = await fetch(`${apiUrl}/api${url}`, config);

            return await response?.json();
        } catch (ex) {
            console.error(ex);
            return {};
        }
    }

    return {
        post,
        get,
    }
}

export default ServerSideApi;