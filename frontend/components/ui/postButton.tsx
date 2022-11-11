export interface PostButtonProps {
	prop?: string;
	data?: string;
	ym?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PostButton: React.FC<PostButtonProps> = ({ prop, data, ym }) => {
	return (
		<div className='pt-4 '>
			<button
				onClick={ym}
				style={{ backgroundColor: `${prop}` }}
				className='inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 '>
				{data}
			</button>
		</div>
	);
};
