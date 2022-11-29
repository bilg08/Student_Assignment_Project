export interface PostButtonProps {
	prop?: string;
	data?: string;
	id?: string;
	ym?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PostButton: React.FC<PostButtonProps> = ({ prop,id, data, ym }) => {
	return (
		<div className='pt-4 '>
			<button
				id={id}
				onClick={ym}
				style={{ backgroundColor: `${prop}` }}
				className='inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 '>
				{data}
			</button>
		</div>
	);
};
