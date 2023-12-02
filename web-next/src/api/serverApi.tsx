
const ServerSideApi = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = '';

    /**
     * Post data to API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param loadCache boolean - Flag if data can be cached 
     * 
     * @returns object - Api response data
     */
    const post = async (url: string, data?: {}, loadCache: boolean = true) => {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data),
            next: { revalidate: 3600 }
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
    }

    return {
        post
    }
}

export default ServerSideApi;