import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
	children: ReactNode;
};

interface PostStateInterface {
	receivedPost: boolean;
	setReceivedPost: (_val: any) => void;
}

export const PostStateContext = createContext<PostStateInterface>({
	receivedPost: false,
	setReceivedPost: (val: any) => {},
});

export const PostStateContextProvider = ({ children }: Props) => {
	// Button false or true
	const [receivedPost, setReceivedPost] = useState(false);
	return (
		<PostStateContext.Provider
			value={{
				receivedPost,
				setReceivedPost,
			}}>
			{children}
		</PostStateContext.Provider>
	);
};

export const usePostStateContext = () => useContext(PostStateContext);
