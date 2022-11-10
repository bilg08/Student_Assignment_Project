import { useCollectionContext } from "../../context/isActive";

export interface MenuListProps {
	onClick: () => {};
	name: string;
	svg: any;
	isActive?: any;
}

export const MenuList2: React.FC<MenuListProps> = ({
	name,
	svg,
	isActive,
	onClick,
}) => {
	const { cActive, setCactive } = useCollectionContext();

	const getMore = () => {
		alert("hiinee");
	};

	return (
		<li>
			<div
				className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 '
				// onClick={(e) => getMore()}
				onClick={() => {
					isActive ? setCactive(true) : setCactive(false);
					onClick;
				}}>
				{svg}
				<span className='ml-4 cursor-pointer'>{name}</span>
			</div>
		</li>
	);
};
