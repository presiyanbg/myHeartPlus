const Api = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = '';

    /**
     * Post data to API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param notification boolean - Flag if notifications should be visible 
     * @param displayLoading boolean - Flag if visual loaders should be visible 
     * @param loadCache boolean - Flag if data can be cached 
     * @param formData boolean - Flag if data send should be send as json of Form data
     * 
     * @returns object - Api response data
     */
    const post = async (url: string, data?: {}, notification: boolean = true, displayLoading: boolean = true, loadCache: boolean = true, formData: boolean = false) => {
        const cache = loadCache ? { revalidate: 3600 } : 'no-store';

        console.log(`${apiUrl}/api${url}`)
        //next: { revalidate: 3600 }
        const response = await fetch(`${apiUrl}/api${url}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data),
            cache: 'no-cache',

        });

        return await response?.json();
    }

    return {
        post
    }
}

export default Api;