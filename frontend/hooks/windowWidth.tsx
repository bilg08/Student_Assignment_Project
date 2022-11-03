
  import { useEffect, useState } from "react";
  interface CollectionContextInterface {
    windowWidth:Number;
    setWindowWidth: (_val: any) => void;
  }
  export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<CollectionContextInterface|Number>(0);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
  
        handleResize();
  
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); 
    return windowWidth;
  };