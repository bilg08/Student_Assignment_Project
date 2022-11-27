import React, { ReactNode } from "react";
import { useIsAgainGetDatas, useModalContext } from "../context";
import { instance } from "../components/Layout";
export const Rate: React.FC<RateType> = ({ post }:any) => {
  const [state, setState] = React.useState<any>(0);
  const { setIsAgainGetDatas } = useIsAgainGetDatas();
  const {setModalText,setOpenModal} = useModalContext()
  const rateWorkerPerformance = async () => {
    await instance.post(`/post/${post._id}/rateWorkerPerformance`, { rating: state })
    .then((res) => {
      setIsAgainGetDatas((e: boolean) => !e);
      setOpenModal(true),
        setModalText('amjilttai')

    });
  };
  return (
    <div className="items-center justify-center w-full flex flex-col justify-between font-medium text-center  bg-white   h-[auto]    ">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {state}
        </label>
        <input
          id="medium-range"
          onChange={(e) => setState(e.target.value)}
          type="range"
          value={state}
          className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <button onClick={rateWorkerPerformance}>Батлах</button>
    </div>
  );
};

type RateType = { children?: ReactNode, post: {_id:string}[] };
