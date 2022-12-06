import { useRef } from "react";
import * as React from "react";
import cn from "classnames";
import { IconNote } from "./Icon/IconNote";
import { IconWarning } from "./Icon/IconWarning";
interface SomeCartType {
	children: React.ReactNode;
	type: string;
}
interface VariantMapsType {
	[key: string]: VariantMapType;
}
interface VariantMapType {
	title: string;
	isDone: boolean;
	Icon: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>;
	containerClasses: string;
	textColor: string;
	overlayGradient: string;
}

const variantMap: VariantMapsType = {
	done: {
		title: "Дууссан",
		isDone: true,
		Icon: IconWarning,
		containerClasses: "bg-red-500 w-full bg-opacity-30",
		textColor: "text-red-500  text-red-40",
		overlayGradient:
			"linear-gradient(rgba(249, 247, 243, 0), rgba(249, 247, 243, 1)",
	},
	notDone: {
		title: "Шинэ зар",
		Icon: IconNote,
		isDone: false,
		containerClasses:
			"bg-green-300 bg-green-300 bg-opacity-20 text-primary text-primary-dark text-lg",
		textColor: "text-green-600 text-green-40",
		overlayGradient:
			"linear-gradient(rgba(245, 249, 248, 0), rgba(245, 249, 248, 1)",
	},
	note: {
		title: "Шинэ зар",
		Icon: IconNote,
		isDone: false,
		containerClasses:
			"bg-indigo-200  bg-green-300 bg-opacity-20 text-primary text-primary-dark text-lg",
		textColor: " dark:text-green-40",
		overlayGradient:
			"linear-gradient(rgba(245, 249, 248, 0), rgba(245, 249, 248, 1)",
	},
};

export const SomeCart: React.FC<SomeCartType> = ({ children, type }) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const variant: VariantMapType = variantMap[type];
	return (
		<div
			className={cn(
				"expandable-callout",
				"pt-8 pb-4 px-5 sm:px-8 my-8 w-5/6 relative rounded-none shadow-inner -mx-5 rounded sm:mx-auto sm:rounded-lg flex-wrap",
				variant.containerClasses
			)}>
			<h3 className={cn("mb-2 text-2xl font-bold flex-wrap ")}>
				<variant.Icon className={cn("inline mr-3 mb-1 text-lg")} />
				{variant.title}
			</h3>
			<div className='relative'>
				<div
					ref={contentRef}
					className='py-2'>
					{children}
				</div>
			</div>
		</div>
	);
};
export const Wip = ({ children }: { children: React.ReactNode }) => (
	<SomeCart type='wip'>{children}</SomeCart>
);
export const Pitfall = ({ children }: { children: React.ReactNode }) => (
	<SomeCart type='pitfall'>{children}</SomeCart>
);
export const Deprecated = ({ children }: { children: React.ReactNode }) => (
	<SomeCart type='deprecated'>{children}</SomeCart>
);
export const Note = ({ children }: { children: React.ReactNode }) => (
	<SomeCart type='note'>{children}</SomeCart>
);
