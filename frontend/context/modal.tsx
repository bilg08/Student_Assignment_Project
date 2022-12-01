import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

interface ModalContextType {
  isOpenModal: any;
  modalText: string;
  type: string;
  setType: (_val: any) => void;
  setModalText: (_val: any) => void;
  setOpenModal: (_val: any) => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpenModal: false,
  modalText: "ModalContext",
  type: '',
  setModalText: (val: any) => {},
  setType: (_val: any) => {},
  setOpenModal: (val: any) => {},
});

export const ModalContextProvider = ({ children }: Props) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [type, setType] = useState("");

  return (
    <ModalContext.Provider
      value={{
        type,
        setType,
        isOpenModal,
        setOpenModal,
        modalText,
        setModalText,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
