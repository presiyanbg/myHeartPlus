import { useState, useContext } from 'react';
import axios from "axios";
import * as Constants from "../constants/api";
import { LoadingContext } from '../context/loadingContext/loadingContextProvider';
import { UserContext } from '../context/userContext/userContextProvider';
import { CacheType } from '../ts/types';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import { CommonContext } from '../context/commonContext/commonContextProvider';

const Api = () => {
  const apiUrl = Constants.API_URL;
  const { setLoading, setDisplayLoader } = useContext(LoadingContext);
  const { cache, setCache } = useContext(CommonContext);
  const { token } = useContext(UserContext);

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
    // Check if data is saved in cache 
    if (loadCache && cache[url] != undefined) {
      setLoading(false);
      setDisplayLoader(false);

      return cache[url];
    }

    // Display loaders 
    setLoading(true);
    setDisplayLoader(displayLoading);

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
        // Hide loaders 
        setLoading(false);
        setDisplayLoader(false);

        // Save data to cache 
        loadCache && setCache((prev: CacheType) => {
          prev[url.toString()] = response.data;
          return prev;
        })

        notification && NotificationManager.success(response.data.message, 'Success', 10000);

        return response.data;
      })
      .catch(function (error: any) {
        // Hide loaders 
        setLoading(false);
        setDisplayLoader(false);

        notification && NotificationManager.error(error.message, 'Error');
      });
  }

  return {
    post
  }
}

export default Api;