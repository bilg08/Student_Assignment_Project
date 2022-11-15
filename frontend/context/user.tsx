import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

interface UserContextInterface {
  user: {
    LastName: String;
    FirstName: String;
    School: String;
      level: String;
    email:String
  };
  setUser: (_val: any) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: {
    LastName: "",
    FirstName: "",
    School: "",
        level: "",
    email:""
  },
  setUser: (val: any) => {},
});

export const UserContextProvider = ({ children }: Props) => {
  // Button false or true
  const [user, setUser] = useState({
    LastName: "",
    FirstName: "",
    School: "",
      level: "",
    email:""
  });
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
