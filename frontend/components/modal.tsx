import { useLoaderContext, useModalContext } from "../context";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconWarning } from "./Icon/IconWarning";
import { IconNote } from "./Icon/IconNote";
import cn from 'classnames'
import { IconClose } from "./Icon/IconClose";

interface SomeCartType {
  children: React.ReactNode;
  type?: string;
}
interface VariantMapsType {
  [key: string]: VariantMapType;
}
interface VariantMapType {
  title: string;
  Icon: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>;
  containerClasses: string;
  textColor: string;
  overlayGradient: string;
}

const variantMap: VariantMapsType = {
  error: {
    title: "Алдаа",
    Icon: IconWarning,
    containerClasses: "bg-red-300 dark:bg-red-60 dark:bg-opacity-20",
    textColor: "text-red-500 dark:text-red-40",
    overlayGradient:
      "linear-gradient(rgba(249, 247, 243, 0), rgba(249, 247, 243, 1)",
  },
  hint: {
    title: "Шинэ зар",
    Icon: IconNote,
    containerClasses:
      "bg-yello-300 dark:bg-green-300 dark:bg-opacity-20 text-primary dark:text-primary-dark text-lg",
    textColor: "text-yellow-600 dark:text-green-40",
    overlayGradient:
      "linear-gradient(rgba(245, 249, 248, 0), rgba(245, 249, 248, 1)",
  },
  success: {
    title: "Амжилттай",
    Icon: IconNote,
    containerClasses:
      "bg-green-200 dark:bg-green-300 dark:bg-opacity-20 text-primary dark:text-primary-dark text-lg",
    textColor: " dark:text-green-40",
    overlayGradient:
      "linear-gradient(rgba(245, 249, 248, 0), rgba(245, 249, 248, 1)",
  },
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Modal = () => {
	const { modalText, isOpenModal, setOpenModal,type } = useModalContext();
	const { setOpenshadow } = useLoaderContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenshadow(false)
  };

const SomeCart: React.FC<SomeCartType> = ({ children }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const variant: VariantMapType = variantMap[type?type:'success'];
  return (
    <div
      className={cn(
        "expandable-callout",
        "pt-8 pb-4 px-5 relative sm:px-8 my-8 w-[400px] h-[200px] relative rounded-none shadow-inner -mx-5 rounded sm:mx-auto sm:rounded-lg flex-wrap",
        variant.containerClasses
      )}>
      <h3 className={cn("mb-2 text-2xl font-bold flex-wrap ")}>
        <variant.Icon className={cn("inline mr-3 mb-1 text-lg")} />
        {variant.title}
      </h3>
      <div className="relative">
        <div ref={contentRef} className="py-2">
          {children}
        </div>
        <button
          style={{ padding: "6px 15px", marginTop: "20px" }}
          className="bg-indigo-600 text-white rounded-lg"
          onClick={handleClose}
          color="primary">
          Гарах
        </button>
      </div>
    </div>
  );
};


	return (
    <div
      className="bg-grey/3 backdrop-blur-xl"
      style={{
        display: isOpenModal ? "flex" : "none",
        position: "absolute",
        top: 0,
        zIndex: "200",
        width: `100%`,
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}>
      <SomeCart>{modalText}</SomeCart>
    </div>
  );
};
