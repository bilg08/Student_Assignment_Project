import { useContext, createContext, useState ,Dispatch,SetStateAction} from "react";
import { Props } from "../types/index";

interface SearchContextType {
	userInput: {
    school:string,
    group:string,
    subject:string
  };
	setUserInput: (_val: any) => void;
}

export const SearchContext = createContext<SearchContextType>({
	userInput: {
    school:"",
    group:"",
    subject:""
  },
	setUserInput: (val: any) => {},
});
export const SearchContextProvider = ({ children }: Props) => {
  const [userInput,setUserInput] = useState<SearchContextType|any>({
    school:"",group:"",subject:""
  })
  

  return (
    <SearchContext.Provider value={{userInput,setUserInput}}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchContext = () => useContext(SearchContext);
