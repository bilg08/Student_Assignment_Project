import axios from "axios";
import { getCookie } from "cookies-next";
import React, { ReactNode, useEffect } from "react";
import { useIsAgainGetDatas, useLoaderContext, useUserContext } from "../context";
import { Header, Footer, Modal } from "./index";
import { Loader } from "./Loader";
export const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { Authorization: getCookie("token"),userId:getCookie('userId') },
});
export const LayOut = (props: { children: ReactNode }) => {
  const { setOpenLoader, setOpenshadow } = useLoaderContext();
  const { isAgainGetDatas,setIsAgainGetDatas } = useIsAgainGetDatas();
  const {setUser} = useUserContext()
  useEffect(() => {
    const getPersonalInfo = async () => {
      try {
        const datas = await instance.get("/users/myInfo");
        setUser(datas.data.data);
      } catch (error) {}
    };
    getPersonalInfo();
  }, [isAgainGetDatas]);
  axios.interceptors.request.use(
    function (config) {

      setOpenLoader(true);
      setOpenshadow(true);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      setIsAgainGetDatas((e: any) => !e);
      setOpenLoader(false);
      setOpenshadow(false);
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return (
    <div className="h-[100vh] w-[100vw]">
      <Modal />
      <Header />
      {props.children}
      <Loader />
      <Footer />
    </div>
  );
};
