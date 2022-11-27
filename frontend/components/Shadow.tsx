import { useLoaderContext } from "../context";
import { Props } from "../types";

export const Shadow = ({ children }: Props) => {
	const { shadow } = useLoaderContext();
	return (
    <div
      style={{ display: shadow ? "block" : "none" }}
      className="absolute top-0 w-[100%] h-[100vh]  z-10 bg-grey/3 backdrop-blur-xl flex items-center justify-center overflow-none">
      {children}
    </div>
  );
};
