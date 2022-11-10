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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loadedRef = useRef<any>(false);
  
useEffect(() => {
  if (loadedRef.current) {
    return;
  }
  loadedRef.current = true;
  let savedHistory = getTokenFromLocal();
  
})
function getTokenFromLocal() {

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
