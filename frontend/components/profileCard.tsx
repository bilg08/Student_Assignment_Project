import React from "react";
export const ProfileCard = (props: CardDataType) => {
	const { children } = props;
	return (
    <div
      className={`w-2/3 flex flex-col flex-wrap border-dark-purple  relative border shadow-cardShadow p-6  ${
        props.disabled
          ? "bg-gray-200"
          : "bg-white"
      } rounded mb-5`}>
      {children}
    </div>
  );
};
type CardDataType = {
	children?: JSX.Element | JSX.Element[];
	index?: number;
	disabled?:boolean
};
