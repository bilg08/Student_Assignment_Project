import axios from "axios";
import { getCookie } from "cookies-next";
import React, { ReactNode } from "react";
import { useIsAgainGetDatas } from "../context";
export const Rate: React.FC<RateType> = ({ post }) => {
  const [state, setState] = React.useState<number | 0>(0);
  const { setIsAgainGetDatas } = useIsAgainGetDatas();
    const rateWorkerPerformance = async () => {
    await axios({
      method: "post",
      url: `http://localhost:8000/post/${post._id}/rateWorkerPerformance`,
      data:{rating:state},
        headers: {
        authorization: getCookie("token"),
      },
    }).then((res) => setIsAgainGetDatas((e: boolean) => !e));
  };
  return (
    <div className="items-center justify-center w-full flex flex-col justify-between font-medium text-center  bg-white border border-dark-purple h-[auto] rounded-full    ">
      <div>
        <button onClick={() => setState(state - 1)}>-</button>
        <input
          value={state}
          type="number"
          onChange={(e) => setState(e.target.value)}
        />
        <button onClick={() => setState(state + 1)}>+</button>
      </div>
      <button onClick={rateWorkerPerformance}>Батлах</button>
    </div>
  );
};

type RateType = { children?: ReactNode };
