import { Dispatch, SetStateAction, useEffect } from "react";

export const Pagination = (props: PaginationType) => {
	const { pagination, setPage, page } = props;
	function makePageCountArray() {
		let array = [];
		for (let i = 0; i < pagination.pageCount; i++) {
			array.push(i + 1);
		}
		return array;
	}

	return (
		<div className='flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
			<div className='flex flex-1 justify-center sm:hidden'>
				<div className='relative inline-flex items-center rounded-md border border-dark-purple bg-white px-4 py-2 text-sm font-medium text-dark-purple hover:bg-gray-50'>
					Previous
				</div>
				<div className='relative ml-3 inline-flex items-center rounded-md border border-dark-purple bg-white px-4 py-2 text-sm font-medium text-dark-purple hover:bg-gray-50'>
					Next
				</div>
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-center'>
				<div>
					<nav
						className='isolate inline-flex -space-x-px rounded-md shadow-sm'
						aria-label='Pagination'>
						<div
							onClick={() => setPage((page: number) => page - 1)}
							className='relative inline-flex items-center rounded-l-md border border-dark-purple bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'>
							<span className='sr-only'>Previous</span>
							<svg
								className='h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='#804fb3'
								aria-hidden='true'>
								<path
									fillRule='evenodd'
									d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						{makePageCountArray().map((pageCount) => (
							<div
								key={pageCount}
								onClick={() => setPage(pageCount)}
								aria-current='page'
								className={`relative z-10 inline-flex items-center border border-dark-purple  ${
									pageCount === page ? "bg-mid-purple" : "bg-light-purple"
								} px-4 py-2 text-sm font-medium text-dark-purple focus:z-20`}>
								{pageCount}
							</div>
						))}
						<div
							onClick={() => setPage((page: number) => page + 1)}
							className='relative inline-flex items-center rounded-r-md border border-dark-purple bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'>
							<span className='sr-only'>Next</span>
							<svg
								className='h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='#804fb3'
								aria-hidden='true'>
								<path
									fillRule='evenodd'
									d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

type PaginationType = {
	pagination: {
		pageCount: number;
	};
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
};
