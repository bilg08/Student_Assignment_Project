export interface MenuListProps {
  name: string;
  spanText: string;
  href: any;
}

export const MenuList: React.FC<MenuListProps> = ({
  name,
  spanText,
  href,
}) => {
  return (
    <li>
      <a href={href}>
        <div className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
          <span className='flex-1 ml-3 whitespace-nowrap'>{spanText}</span>
          <span className='flex-1 ml-3 whitespace-nowrap'>{name}</span>
        </div>
      </a>
    </li>
  );
};

