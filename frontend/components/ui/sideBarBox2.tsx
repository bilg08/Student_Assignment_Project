import React from "react";
export const SidebarBox2 = (props: CardDataType) => {
	const { children } = props;
	return (
		<div
			style={{ marginTop: "25px" }}
			className='bg-white rounded-lg border-mid-purple border shadow-sidebarbox2 mt-0 '>
			{children}
		</div>
	);
};
type CardDataType = {
	children?: JSX.Element | JSX.Element[];
};
