import { useContext, createContext, useState ,Dispatch,SetStateAction} from "react";
import { Props, selectedAdType} from "../types/index";
export type SearchContextType = {
    userinput: {
        school: string,
        subject:string
  };
  setUserinput: Dispatch<SetStateAction<object>>;
};

export const SearchContext = createContext<SearchContextType>({
  userinput: {school:"",subject:""},
  setUserinput: (userinput:object) => {},
});

export const SearchContextProvider = ({ children }: Props) => {
  const [userinput, setUserinput] = useState({school:"",subject:""});
  return (
    <SearchContext.Provider value={{ userinput, setUserinput }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchContext = () => useContext(SearchContext);
