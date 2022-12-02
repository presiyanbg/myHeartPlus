import { useState, useEffect } from 'react';
import axios from "axios";
import * as Constants from "../constants/constants";

const Api = () => {
  const [token, setToken] = useState('');
  const apiUrl = Constants.API_URL;
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  const post = async (url: string, params?: {}) => {
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
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  return {
    post
  }
}

export default Api;