import React from "react";
export const ProfileCard = (props: CardDataType) => {
	const { children } = props;
	return (
		<div className=' w-full flex flex-wrap max-w-sm border-dark-purple  border shadow-cardShadow p-6 max-w-md bg-white rounded mt-5 '>
			{children}
		</div>
	);
};
type CardDataType = {
	children?: JSX.Element | JSX.Element[];
	index?: number;
};
