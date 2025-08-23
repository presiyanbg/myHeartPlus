'use client';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../context/userContext/userContextProvider';
import { LoadingContext } from "@/context/loadingContext/loadingContextProvider";
import { NotificationContext } from "@/context/notificationContext/notificationContextProvider";

const ClientSideApi = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api';
    const { token } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const { notify } = useContext(NotificationContext);

    /**
     * POST data to API
     * 
     * @param url string
     * @param data object
     * @param formData object
     * 
     * @returns object - Api response data
     */
    const post = async (url: string, data?: {}, formData: boolean = false, notification: boolean = false) => {
        return request('POST', url, data, formData, notification);
    }

    /**
     * GET data from API
     * 
     * @param url string
     * @param data object
     * @param formData object
     * 
     * @returns object - Api response data
     */
    const get = async (url: string, data?: {}, formData: boolean = false, notification: boolean = false) => {
        return request('GET', url, data, formData, notification);
    }

    /**
     * Request data from API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param formData boolean - Flag if data send should be send as json of Form data
     * 
     * @returns object - Api response data
     */
    const request = async (method: 'POST' | 'GET', url: string, data?: {}, formData: boolean = false, notification: boolean = false) => {
        setLoading(true);

        try {
            // Format data as json 
            if (!formData) {
                const qs = require('qs');
                data = qs.stringify(data);
            }

            // Request data from API
            const config = {
                method: method,
                url: `${apiUrl}${url}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data,
            };

            return axios(config)
                .then(function (response: any) {
                    setLoading(false);
                    notification && notify(response?.data?.message, response?.status);

                    return response.data;
                })
                .catch(function (error: any) {
                    setLoading(false);
                    notification && notify(error?.response?.data?.message, error?.response?.status);

                    return {};
                });
        } catch (ex) {
            setLoading(false);
            return {};
        }
    }

    return {
        post,
        get,
    }
}

export default ClientSideApi;