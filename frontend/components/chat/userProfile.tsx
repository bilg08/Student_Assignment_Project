import { PostButton } from "../ui/postButton";
import React, { useEffect, useState } from "react";
import { ColasipbleChatBox } from "./chatBox";
import { io } from 'socket.io-client';

export const UserProfileBox = (request: any) => {

	const [isChatting, setChatting] = useState(false);
	const [chatRoom, setChatRoom] = useState('');
	return (
		<div>
			<div className='flex flex-row items-center'>
				<div className='rounded-full h-12 w-12 border border-black pr-2.5'></div>
				<div>{request.request.email&&request.request.email}</div>
			</div>
			<div className='pl-'>Дундаж үнэлгээ: {request.request.averageRating&&request.request.averageRating}</div>
			{isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : <></>}
			<div className='flex flex-row'>
				<PostButton
					data={"Батлах"}
					prop={"rgb(191, 252, 198)"}
				/>
				<PostButton
					data={isChatting ? "Дуусгах" : "Харилцах"}
					prop={"#FDFD96"}
					ym={() => {
						setChatRoom(request.request.chatRoomName)
						setChatting(!isChatting)
					}}
				/>
			</div>
		</div>
	);
};
