import React, { ReactNode } from "react";
export const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className='inline-flex items-center justify-center py-2 px-3 mr-3 font-medium text-center text-dark-purple bg-white border border-dark-purple h-9 rounded-full hover:bg-mid-purple hover:text-white   '>
			{props.children}
		</button>
	);
};

type ButtonProps = { children?: ReactNode; onClick?: () => void };
