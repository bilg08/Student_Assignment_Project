import React, { useState, useEffect, useRef } from "react";
import { PostButton } from "../ui/postButton";
import { io } from "socket.io-client";
import { flushSync} from 'react-dom'
import axios from "axios";
import { getCookie } from "cookies-next";
const connectChatServer = () => {
  const socket = io("http://localhost:8000/", {
    transports: ["websocket"],
  });
  return socket;
};

export const ColasipbleChatBox = ({ chatRoomName }: any) => {
  const [isSentMessage, setIsSentMessage] = useState(false);
  const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([{message:""}]);
  const listRef = useRef<HTMLElement | any>();

	useEffect(() => {
    let socket = connectChatServer();
    socket.onAny((type, message) => {
		if (message) {
		setIsSentMessage(e => !e)
		  scrollToLastMessage()
		}
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    let socket = connectChatServer();
    socket.emit("chat message", message);
    return () => {
      socket.disconnect();
    };
  }, []);
	
	useEffect(() => {
	  async function getMessages() {
      try {
		  const data = await axios.get(`http://localhost:8000/chat/${chatRoomName}/getMessages`,
			  {
				  headers: {
				  authorization:getCookie('token')
			  }
			  });
		  flushSync(() => {
			setMessages(data.data.data);	  
		  })
		  scrollToLastMessage()
      } catch (error) {}
	  }
    	getMessages();		  
  },[isSentMessage,chatRoomName]);
	
 function scrollToLastMessage() {
    let lastChild = listRef.current!.lastChild;
    lastChild?.scrollIntoView({
      block: 'end',
      inline: "nearest",
      behavior:'smooth'
    });
  }
  useEffect(() => {
	  async function sendChat() {
      try {
		   await axios.post(`http://localhost:8000/chat/${chatRoomName}/sendMessage`, { message },
			  {
				  headers: {
				  authorization:getCookie('token')
			  }
		  });
      } catch (error) {}
	  }
    	sendChat();		  
  },[isSentMessage]);

  return (
    <div className="h-48 w-full">
      <div
        id="convo"
			  className="h-2/3 w-5/6 border border-black rounded-lg
			 overflow-scroll 
			  ">
			  <ul ref={listRef}>
				  {messages && messages.map(message => {
				  return <li>{message.message}</li>
			  })}
			  </ul>
		</div>
      <div className="flex flex-row items-center">
        <input
          value={message}
				  onChange={async (e) => {
			await setMessage(e.target.value);
		  }}
          className="border border-black rounded-lg w-4/6 h-8 align-center mt-2 mr-2"></input>
        <PostButton
          data={"Send"}
          prop={"rgb(220, 211, 255)"}
				  ym={async() => {
					  await setIsSentMessage(e => !e);
					  setMessage('')
		  }}></PostButton>
      </div>
    </div>
  );
};
