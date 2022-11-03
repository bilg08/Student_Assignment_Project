import {useContext,createContext, useState} from 'react'
import {SelectedAdContextType,Props,selectedAdType} from '../types/index'
export const SelectedAdContext = createContext<SelectedAdContextType>({
  selectedAd: {
    index: null,
    ad: {
      owner: {
        name:""
      },
      advertisingHeader:"",
      createdAt: "",
      detail:""
    }
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