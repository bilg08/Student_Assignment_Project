import React, { useState } from "react";
import { PostButton } from "../ui/postButton";
export const ColasipbleChatBox = () => {
	return (
		<div className='h-48 w-full'>
			<div
				id='convo'
				className='h-2/3 w-full border border-black'></div>
			<div className='flex flex-row'>
				<input className='border border-gray rounded-lg w-2/3 h-8 align-center'></input>
				<PostButton
					data={"Send"}
					prop={"#C4FAF8"}
					ym={() => {}}></PostButton>
			</div>
		</div>
	);
};
