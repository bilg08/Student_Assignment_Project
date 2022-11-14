import React, { useState } from "react";
import { PostButton } from "../ui/postButton";
export const ColasipbleChatBox = () => {
	return (
		<div className='h-48 w-full'>
			<div
				id='convo'
				className='h-2/3 w-5/6 border border-black rounded-lg'></div>
			<div className='flex flex-row items-center'>
				<input className='border border-black rounded-lg w-4/6 h-8 align-center mt-2 mr-2'></input>
				<PostButton
					data={"Send"}
					prop={"#C4FAF8"}
					ym={() => {}}></PostButton>
			</div>
		</div>
	);
};
