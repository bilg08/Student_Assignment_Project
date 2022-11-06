export interface MenuListProps {
    src: any;
    width?: any;
    quality?: any;
  }

export const MyImage : React.FC<MenuListProps> = ({ src, width, quality }) => {
  return (
    <div className="flex items-center justify-center p-5">
        <img src={src} className='w-3/4 h-[240px]' />

    </div>
  )
}