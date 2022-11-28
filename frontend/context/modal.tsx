import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

interface ModalContextType {
  isOpenModal: any;
  modalText: string;
  setModalText:(_val: any) => void;
  setOpenModal: (_val: any) => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpenModal: false,
  modalText: "ModalContext",
  setModalText: (val: any) => {},

  setOpenModal: (val: any) => {},
});

export const ModalContextProvider = ({ children }: Props) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  useEffect(() => console.log(isOpenModal,modalText),[isOpenModal,modalText])
  return (
    <ModalContext.Provider
      value={{
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
