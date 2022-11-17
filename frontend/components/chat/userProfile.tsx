import { PostButton } from "../ui/postButton";
import React, { useEffect, useState } from "react";
import { ColasipbleChatBox } from "./chatBox";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useIsAgainGetDatas } from "../../context";

export const UserProfileBox = ({request,data}:any) => {
	const [isChatting, setChatting] = useState(false);
	const [chatRoom, setChatRoom] = useState("");
	const { setIsAgainGetDatas, isAgainGetDatas } = useIsAgainGetDatas();
	if(request.worker){
		return (
			<div>
			<div className='flex flex-row items-center'>
				<div className='rounded-full h-12 w-12 border border-black mr-[10px]'></div>
				<div>{request.worker.email && request.worker.email}</div>
			</div>
			<div>
				Дундаж үнэлгээ:{" "}
				{request.worker.averageRating && request.worker.averageRating}
			</div>
			{isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : <></>}
			<div className='flex flex-row'>
				<PostButton
						ym={async () => {
                        setIsAgainGetDatas(true);
                    await axios({
						method: "delete",
						url: `http://localhost:8000/post/${request._id}/removeWorker`,
						data:{
							workerId:request.worker.id
						},
						headers: {"authorization":getCookie('token')},
					  })
						.then(async function (response) {
                         await setIsAgainGetDatas(false)
						})
						.catch(function (response) {
						});
				}}
					data={"Болих"}
					prop={"red"}
				/>
				<PostButton
					data={isChatting ? "Дуусгах" : "Харилцах"}
					prop={"#FDFD96"}
					ym={async () => {
						await setChatRoom(request.worker.chatRoomName);
						setChatting(!isChatting);
					}}
				/>
			</div>
		</div>
		)
	}
	return (
		<div>
			<div className='flex flex-row items-center'>
				<div className='rounded-full h-12 w-12 border border-black mr-[10px]'></div>
				<div>{request.email && request.email}</div>
			</div>
			<div>
				Дундаж үнэлгээ:{" "}
				{request.averageRating && request.averageRating}
			</div>
			{isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : <></>}
			<div className='flex flex-row'>
				<PostButton
					ym={async () => {
                          setIsAgainGetDatas(true);
						
						try {
						
						axios({
							method: "post",
							url: `http://localhost:8000/post/${data._id}/confirmWorkRequest`,
							data:{
								workerId:request.id
							},
							headers: {"authorization":getCookie('token')},
						  })
							.then(function (response) {
                          setIsAgainGetDatas(false);
							})
							.catch(function (response) {
							});
						
					} catch (error) {
						
					}
				}}
					data={"Батлах"}
					prop={"rgb(191, 252, 198)"}
				/>
				<PostButton
					data={isChatting ? "Дуусгах" : "Харилцах"}
					prop={"#FDFD96"}
					ym={async () => {
						await setChatRoom(request.chatRoomName);
						setChatting(!isChatting);
					}}
				/>
			</div>
		</div>
	);
};
