import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import { ProfileCard, Button, Chat } from "../components/index";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { UserProfileBox } from "./chat/userProfile";
import { ColasipbleChatBox } from "./chat/chatBox";
import { Post } from "./ui/post";
export const ReceivedPosts = () => {
  const [personalPosts, setPersonalPosts] = useState([
    {
      subject: "",
      detail: "",
      worker: { id: "", averageRating: "", email: "" },
      pendingRequest: [{ id: "", averageRating: "", email: "" }],
    },
  ]);
	const [postIInterested,setPostIInterested] = useState([{chatRoom:""}])
  useEffect(() => {
    const getPostIInterested = async () => {
      const token = getCookie("token");
      try {
        const datas = await axios.get(
          "http://localhost:8000/post/postToBeDone",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPostIInterested(datas.data.data);
      } catch (error) {}
    };
    getPostIInterested();
  }, []);


  useEffect(() => {
    const getPersonalData = async () => {
      const token = getCookie("token");
      try {
        const datas = await axios.get("http://localhost:8000/users/posts", {
          headers: {
            Authorization: token,
          },
        });
        setPersonalPosts(datas.data.data);
      } catch (error) {}
    };
    getPersonalData();
  }, []);

  const [chosen, setChosen] = useState(true);

  
  return (
    <div className="flex-col items-center lg:w-4/6 md:w-full xs:w-full  m-auto  overflow-auto h-screen  overscroll-y-none md:justify-center pb-[100px]">
      <div className=" h-[50px]  pr-2 z-10 bg-white flex justify-between items-end">
        <h1 className="text-4xl text-center mt-4">
          {chosen ? "Миний зар" : "Хүлээн авсан зар"}
        </h1>
        <Button onClick={() => setChosen(!chosen)}>
          {chosen ? "Хүлээн авсан зар" : "Миний зар"}
        </Button>
      </div>
      {chosen ? (
        // <Chosen personalPosts={personalPosts} />
        <Post data={personalPosts}/>
      ) : (
        <div className="overscroll-y-none  flex-col flex items-center pb-[100px]">
		{postIInterested.map((el, ind) => {
            return (
              <ColasipbleChatBox chatRoomName={el.chatRoom} />
            );
          })}
        </div>
      )}
    </div>
  );
};
