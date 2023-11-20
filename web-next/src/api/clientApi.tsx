'use client';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../context/userContext/userContextProvider';

const ClientSideApi = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api';
    const { token } = useContext(UserContext);

    /**
     * Post data to API
     * 
     * @param url string - API url that data is sended to
     * @param data object - Data for the API
     * @param formData boolean - Flag if data send should be send as json of Form data
     * 
     * @returns object - Api response data
     */
    const post = async (url: string, data?: {}, formData: boolean = false) => {
        // Format data as json 
        if (!formData) {
            const qs = require('qs');
            data = qs.stringify(data);
        }

        // Request data from API
        const config = {
            method: 'post',
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
                return response.data;
            })
            .catch(function (error: any) {
                console.error(error);
            });
    }

    return {
        post
    }
}

export default ClientSideApi;