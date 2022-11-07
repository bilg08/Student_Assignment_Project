import styles from "./Input.module.css";
import React, { Dispatch, SetStateAction } from "react";
type InputComponentsPropsType = {
	placeholder: String | any;
	icon: React.ReactElement;
	onchange?: any;
	name: any;
	userInput?: object;
};
export const Input = ({
	placeholder,
	icon,
	onchange,
	name,
	userInput,
}: InputComponentsPropsType) => {
	return (
		<div className='flex hover:border-dark-purple hover:border-2 focus justify-between pl-4 pr-4 items-center border-solid border border-mid-purple h-12 w-72 rounded-full '>
			<input
				className='outline-none placeholder-mid-purple hover:placeholder-dark-purple'
				onChange={(e) =>
					onchange({ ...userInput, [e.target.name]: e.target.value })
				}
				name={name}
				placeholder={placeholder}
			/>
			<span className='text-2xl text-dark-purple'>{icon}</span>
		</div>
	);
};
