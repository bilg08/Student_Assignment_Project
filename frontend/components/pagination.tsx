import { Dispatch, SetStateAction, useEffect } from "react";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export const Pagination1 = (props: PaginationType) => {
	const { pagination, setPage, page } = props;
	
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	  };
	useEffect(() => {
		console.log(page)
	},[page])
	return (
	<Stack className='flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
	  <Pagination onChange={handleChange} page={page} count={pagination.pageCount} color="secondary" />
    </Stack>
	);
};

type PaginationType = {
	pagination: {
		pageCount: number;
	};
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
};
