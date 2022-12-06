import React, { useState, useEffect, useRef } from "react";
import { PostButton } from "../ui/postButton";
import { io } from "socket.io-client";
import { flushSync } from "react-dom";
import { getCookie } from "cookies-next";
import { useIsAgainGetDatas, useUserContext } from "../../context";
import { instance } from "../../components/Layout";
import { Chip } from "@mui/material";
import CollectionsIcon from '@mui/icons-material/Collections';
export const connectChatServer = () => {
	const socket = io("http://localhost:8000/", {
		transports: ["websocket"],
	});
	return socket;
};

export const ColasipbleChatBox = ({ chatRoomName }: any) => {
	const [isSentMessage, setIsSentMessage] = useState(false);
	const [message, setMessage] = useState("");
	const { user } = useUserContext();
	const { setIsAgainGetDatas } = useIsAgainGetDatas();
	const [file,setFile] = useState('')
	const [fileUrl,setFileUrl] = useState('')

	const [messages, setMessages] = useState([
		{ message: "", createdAt: "", owner: { email: "" },photo:'' },
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
			if (message && type === chatRoomName) {
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
			const form = new FormData()
			form.append('message',message)
			form.append('file',file)
			try {
				await instance.post(`/chat/${chatRoomName}/sendMessage`, form)
			} catch (error) {
			}
		}
		if (message !== "" && chatRoomName !== "") sendChat();
	}, [isSentMessage]);
	useEffect(() => {
		async function getMessages() {
			setIsAgainGetDatas((e: any) => !e);
			try {
				const data = await instance.get(`/chat/${chatRoomName}/getMessages`, {
					headers: {
						authorization: getCookie("token"),
					},
				});
				flushSync(async () => {
					setMessages(data.data.data);
					setFile('')
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
function handleUploadFile(e:any) {
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function (event:any) {
	  setFileUrl(event.target.result);
	};
	reader.readAsDataURL(file);
	
	setFile(e.target.files[0])
}

	return (
		<div className='h-48 w-[100%] '>
			<div
				className='h-2/3  border border-green-500 rounded-lg
			 overflow-scroll 
			  '>
				<ul ref={listRef}>
					{messages &&
						messages.map((message) => {
							return (
								<li className={`m-1 flex justify-between w-full px-1`}>
									{message && user.email === message.owner.email ? (
										<>
										<span></span>
										<div >
										<Chip label={message.message} />
										{message.photo?<img style={{width:`50px`,height:'50px'}} src={`http://localhost:8000/chat/photo/${message.photo}`}/>:''}
										</div>
										</>
									) : (
										<>
										<div>
										<Chip variant='outlined' label={message.message} />
										{message.photo?<img style={{width:`50px`,height:'50px'}} src={`http://localhost:8000/chat/photo/${message.photo}`}/>:''}
										</div>
										<span></span>
										
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
					className='border border-green-500 bg-grey-100 rounded-lg w-4/6 h-8 align-center mt-2 mr-2'></input>
				<label>
					<CollectionsIcon/>
					<input className="hidden" onChange={(e)=>{handleUploadFile(e)}} type='file'/>
				</label>
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
