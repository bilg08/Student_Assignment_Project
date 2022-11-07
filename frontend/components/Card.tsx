import React from "react";
import { useSelectedContext } from "../context/index";
export const Card = (props: CardDataType) => {
	const { children } = props;
	const { selectedAd } = useSelectedContext();
	return (
		<div
			className={
				(selectedAd?.index === props.index &&
					selectedAd !== undefined &&
					" animate-border w-full max-w-sm border-dark-purple  border-2 p-6 max-w-md bg-white rounded mt-5 ") ||
				"p-6 max-w-md bg-white rounded-lg border border-dark-purple shadow-cardShadow mt-5"
			}>
			{children}
		</div>
	);
};
type CardDataType = {
	children?: JSX.Element | JSX.Element[];
	index?: number;
};
