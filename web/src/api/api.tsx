import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import * as Constants from "../constants/api";
import { LoadingContext } from '../context/loadingContext/loadingContextProvider';
import { UserContext } from '../context/userContext/userContextProvider';
// @ts-ignore
import { NotificationManager } from 'react-notifications';

const Api = () => {
  const apiUrl = Constants.API_URL;
  const { setLoading, setDisplayLoader } = useContext(LoadingContext);
  const { token } = useContext(UserContext);

  const post = async (url: string, params?: {}, notification: boolean = true, displayLoading: boolean = true) => {
    setLoading(true);
    setDisplayLoader(displayLoading);

    const qs = require('qs');
    const data = qs.stringify(params);
    const config = {
      method: 'post',
      url: `${apiUrl}${url}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    return axios(config)
      .then(function (response: any) {
        setLoading(false);
        setDisplayLoader(false);

        notification && NotificationManager.success(response.data.message, 'Success', 10000);

        return response.data;
      })
      .catch(function (error: any) {
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