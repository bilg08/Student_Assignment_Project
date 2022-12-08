import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
export const Pagination1 = (props: PaginationType) => {
	const { pagination, setPage, page } = props;
	console.log(props)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6 fixed bottom-10 w-full">
      <Pagination
        onChange={handleChange}
        page={page}
        count={pagination.pageCount}
        color="secondary"
      />
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
