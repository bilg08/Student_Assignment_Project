import { useState } from "react";
import { instance } from "../../components/Layout";
import { useIsAgainGetDatas } from "../../context";
import { Rate } from "../rating";
import { PostButton } from "../ui/postButton";
import { ColasipbleChatBox } from "./chatBox";

export const UserProfileBox = ({ request, post }:any) => {
	const [isChatting, setChatting] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [chatRoom, setChatRoom] = useState("");
  const { setIsAgainGetDatas } = useIsAgainGetDatas();
  const confirmWorkRequest = async () => {
    await instance.post(`/post/${post._id}/confirmWorkRequest`,{workerId:request.id})
    .then((res) => setIsAgainGetDatas((e: boolean) => !e));
	};
  const cancelWorkRequest = async () => {
    await instance.post(`/post/${post._id}/cancelWorkRequest`, {
      workerId: request.id,
    })
		.then((res) => {
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
            ym={() =>{ cancelWorkRequest();setIsAgainGetDatas((e:boolean)=>!e)}}
            prop={"red"}
          />
          <PostButton ym={() =>setIsRating(!isRating)} data={"Үнэлгээ өгөх"} prop={"green"} />
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
