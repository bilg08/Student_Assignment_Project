import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};

interface IsUserLoggedContextInterface {
  isLoggedIn: any;
  setIsLoggedIn: (_val: any) => void;
}

export const IsUserLoggedContext = createContext<IsUserLoggedContextInterface>({
    isLoggedIn: false,
    setIsLoggedIn: (val: any) => {},
});

export const IsUserLoggedContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const loadedRef = useRef<any>(false);
  
useEffect(() => {
  getTokenFromLocal()
},[])
async function getTokenFromLocal() {
  let token;
  try {
    token = await localStorage.getItem('token');
   if(token) setIsLoggedIn(true)
  } catch (error) {
    
  }
  
  

}
  return (
    <IsUserLoggedContext.Provider
      value={{
        isLoggedIn, setIsLoggedIn
      }}
    >
      {children}
    </IsUserLoggedContext.Provider>
  );
};

export const useIsUserLoggedContext = () => useContext(IsUserLoggedContext);
