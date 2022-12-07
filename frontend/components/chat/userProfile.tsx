import { useState } from "react";
import { instance } from "../../components/Layout";
import { useIsAgainGetDatas } from "../../context";
import { Rate } from "../rating";
import { PostButton } from "../ui/postButton";
import { ColasipbleChatBox } from "./chatBox";

export const UserProfileBox = ({ request, post }: any) => {
	const [isChatting, setChatting] = useState(false);
	const [isRating, setIsRating] = useState(false);
	const [chatRoom, setChatRoom] = useState("");
	const { setIsAgainGetDatas } = useIsAgainGetDatas();
	const confirmWorkRequest = async () => {
		await instance
			.post(`/post/${post._id}/confirmWorkRequest`, { workerId: request.id })
			.then((res) => setIsAgainGetDatas((e: boolean) => !e));
	};
	const cancelWorkRequest = async () => {
		await instance
			.post(`/post/${post._id}/cancelWorkRequest`, {
				workerId: request.id,
			})
			.then((res) => {
				setIsAgainGetDatas((e: boolean) => !e);
			});
	};
	if (post.worker.id !== "") {
		return (
			<div className='h-[auto] border border-green-600 px-4 py-3 rounded-lg '>
				<div className='fleh flex-row items-center '>
					<div className='rounded-full h-12 w-12 border border-black mr-[10px]'></div>
					<div style={{ fontSize: "14px", font: "Roboto" }}>
						{request.email && request.email}
					</div>
				</div>
				<div>
					Дундаж үнэлгээ: {request.averageRating && request.averageRating}
				</div>
				{isChatting ? (
					<ColasipbleChatBox chatRoomName={chatRoom} />
				) : (
					<div></div>
				)}
				<div className='flex flex-row'>
					<PostButton
						data={"Цуцлах"}
						ym={() => {
							cancelWorkRequest();
							setIsAgainGetDatas((e: boolean) => !e);
						}}
						prop={"#C23A22"}
					/>
					<PostButton
						ym={() => setIsRating(!isRating)}
						data={"Үнэлгээ өгөх"}
						prop={"#027324"}
					/>
					<PostButton
						data={isChatting ? "Дуусгах" : "Харилцах"}
						prop={"#804fb3"}
						ym={async () => {
							await setChatRoom(request.chatRoomName);
							setChatting(!isChatting);
						}}
					/>
				</div>
				{isRating ? <Rate post={post} /> : ""}
			</div>
		);
	} else {
		return (
			<div className='border border-green-600 px-4 py-3 rounded-lg'>
				<div className='flex flex-row items-center'>
					<div className='rounded-full h-12 w-12 border border-black mr-[10px]'></div>
					<div>{request.email && request.email}</div>
				</div>
				<div>
					Дундаж үнэлгээ: {request.averageRating && request.averageRating}
				</div>
				{isChatting ? (
					<ColasipbleChatBox chatRoomName={chatRoom} />
				) : (
					<div></div>
				)}
				<div className='flex flex-row'>
					<PostButton
						data={"Батлах"}
						ym={() => confirmWorkRequest()}
						prop={"#027324"}
					/>
					<PostButton
						data={isChatting ? "Дуусгах" : "Харилцах"}
						prop={"#804fb3"}
						ym={async () => {
							await setChatRoom(request.chatRoomName);
							setChatting(!isChatting);
						}}
					/>
				</div>
			</div>
		);
	}
};
