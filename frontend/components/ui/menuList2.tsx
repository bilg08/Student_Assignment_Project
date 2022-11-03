import { useCollectionContext } from "../../context/isActive";

export interface MenuListProps {
  name: string;
  svg: any;
  isActive?: any;
}

export const MenuList2: React.FC<MenuListProps> = ({ name, svg, isActive }) => {

    const {cActive, setCactive } = useCollectionContext()

    const getMore = () => {
		alert("hiinee");
	};
  return (
    <li>
      <div
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
        // onClick={(e) => getMore()}
        onClick={() => isActive ? setCactive(!cActive) : null}
      >
        {svg}
        <span className="ml-4">{name}</span>
      </div>
    </li>
  );
};

