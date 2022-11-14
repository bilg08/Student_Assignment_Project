import { PostButton } from "../ui/postButton";
import React, { useState } from "react";
import { ColasipbleChatBox } from "./chatBox";
export const UserProfileBox = (request: any) => {
	const [isChatting, setChatting] = useState(false);
	console.log(request);

	return (
		<div>
			<div className='flex flex-row items-center'>
				<div className='rounded-full h-12 w-12 border border-black pr-2.5'></div>
				<div>{request.request.email}</div>
			</div>
			<div className='pl-'>Дундаж үнэлгээ: {request.request.averageRating}</div>
			{isChatting ? <ColasipbleChatBox /> : <></>}
			<div className='flex flex-row'>
				<PostButton
					data={"Батлах"}
					prop={"rgb(225 29 72)"}
				/>
				<PostButton
					data={isChatting ? "Дуусгах" : "Харилцах"}
					prop={"rgb(225 29 72)"}
					ym={() => setChatting(!isChatting)}
				/>
			</div>
		</div>
	);
};
