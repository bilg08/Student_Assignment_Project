export interface PostButtonProps {
	prop?: string;
	data?: string;
	ym?: () => {};
}

export const PostButton: React.FC<PostButtonProps> = ({ prop, data, ym }) => {
	console.log(data);
	const handleOnClick = (e: any) => {
		// if(e.target.innerText === 'Delete')
	};
	// {
	// name:'chat',
	// function:()=> {

	// }
	// }
	//funtiongetHaha{
	// console.log()
	// }
	//<Button onClick={gethaha}> haha</Button>
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
