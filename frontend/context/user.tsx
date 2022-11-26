import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
type Props = {
  children: ReactNode;
};

interface UserContextInterface {
  user: {
    LastName: string;
    FirstName: string;
    School: string;
    level: string;
    email: string;
    _id: string;
    averageRatingByGroupByGroup:Array<object>
  };
  setUser: (_val: any) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: {
    LastName: "",
    FirstName: "",
    School: "",
    level: "",
    email: "",
    _id: "",
    averageRatingByGroupByGroup:[]
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
    email: "",
    _id: "",
    averageRatingByGroupByGroup:[]
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
