import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

interface loaderType {
  shadow: boolean;
  setOpenshadow: (_val: any) => void;
  loader: boolean;
  setOpenLoader: (_val: any) => void;
}

export const LoaderContext = createContext<loaderType>({
  shadow: false,
  setOpenshadow: (val: any) => {},
  loader: false,
  setOpenLoader: (val: any) => {},
});

export const LoaderContextProvider = ({ children }: Props) => {
  // Button false or true
  const [shadow, setOpenshadow] = useState(false);
  const [loader, setOpenLoader] = useState(false);
  return (
    <LoaderContext.Provider
      value={{
        shadow,
        setOpenshadow,
        setOpenLoader,
        loader,
      }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => useContext(LoaderContext);
