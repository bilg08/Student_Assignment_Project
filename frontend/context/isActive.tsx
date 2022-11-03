import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

interface CollectionContextInterface {
  cActive: any;
  setCactive: (_val: any) => void;
}

export const CollectionContext = createContext<CollectionContextInterface>({
  cActive: true,
  setCactive: (val: any) => {},
});

export const CollectionContextProvider = ({ children }: Props) => {
  // Button false or true
  const [cActive, setCactive] = useState<CollectionContextInterface|true>(true);
  return (
    <CollectionContext.Provider
      value={{
        cActive,
        setCactive,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionContext = () => useContext(CollectionContext);
