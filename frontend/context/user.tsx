import { createContext, ReactNode, useContext, useState } from "react";
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
    averageRating: number;
    _id: string;
    averageRatingByGroupByGroup: { _id: string; avg: number; sum: number}[];
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
    averageRating:0,
    averageRatingByGroupByGroup: [{
      _id: "",
      avg: 0,
      sum:0
    }]
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
    averageRating: 0,
    averageRatingByGroupByGroup: [
      {
        _id: "",
        avg: 0,
        sum: 0,
      },
    ],
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
