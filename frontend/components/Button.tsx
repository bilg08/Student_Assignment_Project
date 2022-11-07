import React, { ReactNode } from "react";
//Bicegelel adilhan
// const Button = (props:ButtonProps) => <div>{message}</div>;
export const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className='inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-dark-purple bg-white border border-dark-purple h-12 w-өшэ rounded-full hover:bg-mid-purple hover:text-white  dark:bg-white dark:hover:bg-light-purple '>
			{props.children}
			<svg
				aria-hidden='true'
				className='ml-2 -mr-1 w-4 h-4'
				fill='currentColor'
				viewBox='0 0 20 20'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fillRule='evenodd'
					d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
					clipRule='evenodd'></path>
			</svg>
		</button>
	);
};

type ButtonProps = { children?: ReactNode; onClick?: () => void };
