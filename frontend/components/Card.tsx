import React from "react";
import { useSelectedContext } from "../context/index";
export const Card = (props: CardDataType) => {
<<<<<<< HEAD
    const {children} = props;
    const { selectedAd } = useSelectedContext();
    return (
        <div style={{minWidth:414+'px'}} className={selectedAd?.index===props.index?"animate-border min-w-[400px] bg-red-100 w-full max-w-sm border-blue-500  border-2 p-6 max-w-md bg-white rounded ":"min-w-[400px] p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-2xl"}>
            {children}    
        </div>
    )
} 
=======
  const { children } = props;
  const { selectedAd } = useSelectedContext();
  return (
    <div
      className={
        selectedAd?.index == props.index
          ? "animate-border w-full max-w-sm border-blue-500  border-2 p-6 max-w-md bg-white rounded mt-5 "
          : "p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-2xl mt-5"
      }
    >
      {children}
    </div>
  );
};
>>>>>>> parent of fe34519 (Revert ".")
type CardDataType = {
  children?: JSX.Element | JSX.Element[];
  index?: number;
};
