import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, {  ReactNode } from 'react';
import { useLoaderContext } from '../context';
import { Props } from '../types';
import { Header, Footer,Modal} from './index';
import { Loader } from './Loader';
export const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: { Authorization: getCookie("token") },
});
export const LayOut = (props: { children: ReactNode }) => {
  const { setOpenLoader,setOpenshadow } = useLoaderContext()
  
  axios.interceptors.request.use(
    function (config) {
      console.log('yvlaa2')
      setOpenLoader(true);
      setOpenshadow(true)
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      console.log("irlee2");

setOpenLoader(false);
setOpenshadow(false);      
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
    return (
      <div className="h-[100vh] w-full">
        <Modal />
        <Header />
        {props.children}
        <Loader/>
        <Footer />
      </div>
    );
}