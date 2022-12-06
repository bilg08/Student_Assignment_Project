import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
	children: ReactNode;
};

interface SiderBarInterface {
	bigsidebar: boolean;
	setBigsidebar: (_val: any) => void;
}

export const SidebarContext = createContext<SiderBarInterface>({
	bigsidebar: false,
	setBigsidebar: () => {},
});

export const SidebarContextProvider = ({ children }: Props) => {
	const [bigsidebar, setBigsidebar] = useState(false);
	return (
		<SidebarContext.Provider
			value={{
				bigsidebar,
				setBigsidebar,
			}}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebarContext = () => useContext(SidebarContext);
