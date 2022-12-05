import { createContext, useContext, useState } from 'react';
import { Props, SelectedAdContextType, selectedAdType } from '../types/index';
export const SelectedAdContext = createContext<SelectedAdContextType>({
  selectedAd: {
    index: null,
    ad: {
      owner: {
        name: "",
      },
      _id:"",
      photo:"",
      price:"",
      advertisingHeader:"",
      createdAt: "",
      detail: "",
      subject: "",
      group:''
    },
  },
  setSelectedAd: (_val: any) => {},
});

export const SelectedAdContextProvider = ({children}:Props) => {
  const [selectedAd,setSelectedAd] = useState<selectedAdType|any>()
    return(
        <SelectedAdContext.Provider value={{selectedAd,setSelectedAd}}>
            {children}
        </SelectedAdContext.Provider>
    )
}
export const useSelectedContext = () => useContext(SelectedAdContext)