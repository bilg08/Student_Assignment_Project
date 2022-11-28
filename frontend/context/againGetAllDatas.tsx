import { createContext, useContext, useState } from 'react';
import { Props } from '../types';

type isAgainGetDatasContextType = {
  isAgainGetDatas: boolean;
  setIsAgainGetDatas: (_val: any) => void;
}

export const IsAgainGetDatas = createContext<isAgainGetDatasContextType>({
  isAgainGetDatas:false,
  setIsAgainGetDatas: (_val: any) => {},
});

export const IsAgainGetDatasProvider = ({children}:Props) => {
  const [isAgainGetDatas, setIsAgainGetDatas] = useState<any>(false);
    return(
        <IsAgainGetDatas.Provider value={{isAgainGetDatas,setIsAgainGetDatas}}>
            {children}
        </IsAgainGetDatas.Provider>
    )
}
export const useIsAgainGetDatas = () => useContext(IsAgainGetDatas)