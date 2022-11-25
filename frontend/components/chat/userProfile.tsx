import { PostButton } from "../ui/postButton";
import React, { useState } from "react";
import { ColasipbleChatBox } from "./chatBox";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useIsAgainGetDatas } from "../../context";
import { Rate } from "../rating";

export const UserProfileBox = ({ request, post }) => {
	const [isChatting, setChatting] = useState(false);
  const [isRating, setIsRating] = useState(false);
	
  const [chatRoom, setChatRoom] = useState("");
	const { setIsAgainGetDatas } = useIsAgainGetDatas();
	const confirmWorkRequest = async () => {
    await axios({
      method: "post",
      data: { workerId: request.id },
      url: `http://localhost:8000/post/${post._id}/confirmWorkRequest`,
      headers: {
        authorization: getCookie("token"),
      },
    }).then((res) => setIsAgainGetDatas((e: boolean) => !e));
	};
	const cancelWorkRequest = async() => {
		await axios({
      method: "post",
      data: { workerId: request.id },
      url: `http://localhost:8000/post/${post._id}/cancelWorkRequest`,
      headers: {
        authorization: getCookie("token"),
      },
		}).then((res) => {
			console.log(res)
		setIsAgainGetDatas((e: boolean) => !e);
	});
	}
	if (post.worker.id !== "") {
		return (
      <div className="h-[auto]">
        <div className="fleh flex-row items-center">
          <div className="rounded-full h-12 w-12 border border-black mr-[10px]"></div>
          <div>{request.email && request.email}</div>
        </div>
        <div>
          Дундаж үнэлгээ: {request.averageRating && request.averageRating}
        </div>
        {isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : <></>}
        <div className="flex flex-row">
          <PostButton
            data={"Цуцлах"}
            ym={() => cancelWorkRequest()}
            prop={"red"}
          />
          <PostButton ym={() =>setIsRating(true)} data={"Үнэлгээ өгөх"} prop={"green"} />
          <PostButton 
            data={isChatting ? "Дуусгах" : "Харилцах"}
            prop={"#FDFD96"}
            ym={async () => {
              await setChatRoom(request.chatRoomName);
              setChatting(!isChatting);
            }}
          />
        </div>
				{isRating ? <Rate post={post} />:""}
      </div>
    );
	} else {
		return (
      <div>
        <div className="flex flex-row items-center">
          <div className="rounded-full h-12 w-12 border border-black mr-[10px]"></div>
          <div>{request.email && request.email}</div>
        </div>
        <div>
          Дундаж үнэлгээ: {request.averageRating && request.averageRating}
        </div>
        {isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : <></>}
        <div className="flex flex-row">
          <PostButton
            data={"Батлах"}
            ym={() => confirmWorkRequest()}
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
	}
  

  
};
