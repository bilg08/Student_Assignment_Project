import React from "react";
export const ProfileCard = (props: CardDataType) => {
	const { children } = props;
	return (
		<div className=' w-2/3 flex flex-col flex-wrap  border-dark-purple  border shadow-cardShadow p-6  bg-white rounded mt-5 '>
			{children}
		</div>
	);
};
type CardDataType = {
	children?: JSX.Element | JSX.Element[];
	index?: number;
};
