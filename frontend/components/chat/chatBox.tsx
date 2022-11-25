import React, { useState, useEffect, useRef } from "react";
import { PostButton } from "../ui/postButton";
import { io } from "socket.io-client";
import { flushSync } from "react-dom";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useIsAgainGetDatas, useUserContext } from "../../context";
const connectChatServer = () => {
	const socket = io("http://localhost:8000/", {
		transports: ["websocket"],
	});
	return socket;
};

export const ColasipbleChatBox = ({ chatRoomName }: any) => {
	const [isSentMessage, setIsSentMessage] = useState(false);
	const [message, setMessage] = useState("");
	const { user } = useUserContext();
	const {setIsAgainGetDatas} = useIsAgainGetDatas()
	const [messages, setMessages] = useState([
		{ message: "", createdAt: "", owner: { email: "" } },
	]);
	const listRef = useRef<HTMLElement | any>();
	useEffect(() => {
		let socket = connectChatServer();
		socket.emit(chatRoomName, message);
		return () => {
			socket.disconnect();
		};
	}, [isSentMessage]);

	useEffect(() => {
		let socket = connectChatServer();
		socket.onAny(async (type, message) => {
			if (message&&type===chatRoomName) {
				await setIsSentMessage((e) => !e);
				scrollToLastMessage();
			}
		});
		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		async function sendChat() {
			try {
				await axios.post(
					`http://localhost:8000/chat/${chatRoomName}/sendMessage`,
					{ message },
					{
						headers: {
							authorization: getCookie("token"),
						},
					}
				);
			} catch (error) {}
		}
		if (message !== "" && chatRoomName !== "") sendChat();
	}, [isSentMessage]);

	useEffect(() => {
		async function getMessages() {
			setIsAgainGetDatas((e:any)=>!e)
			try {
				const data = await axios.get(
					`http://localhost:8000/chat/${chatRoomName}/getMessages`,
					{
						headers: {
							authorization: getCookie("token"),
						},
					}
				);
				flushSync(async () => {
					setMessages(data.data.data);
				});
				scrollToLastMessage();
			} catch (error) {}
		}
		getMessages();
	}, [chatRoomName, isSentMessage]);
	
	useEffect(() => {});
	function scrollToLastMessage() {
		let lastChild = listRef.current!.lastChild;
		lastChild?.scrollIntoView({
			block: "end",
			inline: "nearest",
			behavior: "smooth",
		});
	}

	return (
		<div className='h-48 w-full'>
			<div
				id='convo'
				className='h-2/3 h-12 w-5/6 border border-black rounded-lg
			 overflow-scroll 
			  '>
				<ul ref={listRef}>
					{messages &&
						messages.map((message) => {
							return (
								<li className={`m-1 flex justify-between w-full`}>
									{message && user.email === message.owner.email ? (
										<>
											<span
												className={`border-2 px-2 relative rounded-xl ${
													message && user.email === message.owner.email
														? `bg-blue-500 `
														: "bg-white "
												}`}>
												{message.message}
											</span>{" "}
											<span></span>
										</>
									) : (
										<>
											<span></span>
											<span
												className={`border-2 px-2 relative rounded-xl ${
													message && user.email === message.owner.email
														? `bg-blue-500 `
														: "bg-white "
												}`}>
												{message.message}
											</span>{" "}
										</>
									)}
								</li>
							);
						})}
				</ul>
			</div>
			<div className='flex flex-row items-center'>
				<input
					value={message}
					onChange={async (e) => {
						await setMessage(e.target.value);
					}}
					className='border border-black rounded-lg w-4/6 h-8 align-center mt-2 mr-2'></input>
				<PostButton
					data={"Send"}
					prop={"rgb(220, 211, 255)"}
					ym={async () => {
						if (message !== "" && chatRoomName !== "") {
							await setIsSentMessage((e) => !e);
							setMessage("");
						}
					}}></PostButton>
			</div>
		</div>
	);
};
