export interface MenuListProps {
	onClick?: () => void;
	name: string;
	svg: any;
}

export const MenuList2: React.FC<MenuListProps> = ({ name, svg, onClick }) => {
	return (
		<li>
			<div
				className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 '
				onClick={() => {

				}}>
				{svg}
				<span className='ml-4 cursor-pointer'>{name}</span>
			</div>
		</li>
	);
};
