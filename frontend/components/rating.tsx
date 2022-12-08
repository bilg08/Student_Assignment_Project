import { Slider } from "@mui/material";
import React, { ReactNode } from "react";
import { instance } from "../components/Layout";
import { useIsAgainGetDatas, useModalContext } from "../context";
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
    <div className="items-center justify-center w-full flex flex-col justify-between font-medium text-center   h-[auto]    ">
      <Slider
        defaultValue={state}
        onChange={(e:any) => setState(e.target.value)}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
     
      <button onClick={rateWorkerPerformance}>Батлах</button>
    </div>
  );
};

type RateType = { children?: ReactNode, post: {_id:string}[] };
