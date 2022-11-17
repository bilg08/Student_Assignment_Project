import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import { ProfileCard, Button, Chat } from "../components/index";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { UserProfileBox } from "./chat/userProfile";
import { ColasipbleChatBox } from "./chat/chatBox";
import { useIsAgainGetDatas } from "../context";
export const ReceivedPosts = () => {
	const {isAgainGetDatas} = useIsAgainGetDatas()
	const [personalPosts, setPersonalPosts] = useState([
		{
			subject: "",
			detail: "",
			worker: { id: "", averageRating: "", email: "" },
			pendingRequest: [{ id: "", averageRating: "", email: "" }],
		},
	]);
	const [postIInterested, setPostIInterested] = useState([{ chatRoom: "", subject: "", detail: "" }]);
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
  }, [isAgainGetDatas]);
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
  }, [isAgainGetDatas]);

	const postedButtonArr = [
		{
			textValue: "Edit",
			style: "#C4FAF8",
			function: () => {}
		},
		{
			textValue: "Delete",
			style: "#FFABAB",
			function: (el: React.MouseEvent<HTMLButtonElement>) => {
				const button: HTMLButtonElement = el.currentTarget;
				const id = button.value;
				axios
					.delete(`http://localhost:8000/post/${id}`)
					.then(function (response) {
					});
			},
		},
	];
	const buttonArr = [
		{
			textValue: "Submit",
			style: "#C4FAF8",
			function: async () => {

			},
		},
		{
			textValue: "Cancel",
			style: "#FFABAB",
			function: () => {
			},
		},
	];
	const [chosen, setChosen] = useState(true);
	const [isChatting, setChatting] = useState(false);
	const [chatRoom, setChatRoom] = useState("");

	return (
		<div className='flex-col items-center lg:w-4/6 md:w-full xs:w-full  m-auto ml-14 overflow-auto h-screen  overscroll-y-none'>
			<div className=' h-[50px]  pr-2 z-10 bg-white flex justify-between items-end'>
				<h1 className='text-4xl text-center mt-4'>
					{chosen ? "Миний зар" : "Хүлээн авсан зар"}
				</h1>
				<Button onClick={() => setChosen(!chosen)}>
					{chosen ? "Хүлээн авсан зар" : "Миний зар"}
				</Button>
			</div>
			{chosen ? (
				<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
					{personalPosts.map((el, ind) => {
						return (
							<ProfileCard key={ind}>
								<PostReceived
									name={el.subject}
									owner={"oruuln"}
									description={el.detail}
								/>
								<div className='flex flex-row flex-wrap'>
									{postedButtonArr?.map((el, index): any => (
										<PostButton
											key={index}
											data={el.textValue}
											prop={el.style}
											ym={el.function}
										/>
									))}
								</div>
								<div>
									<h1>Хийх хүсэлтүүд:</h1>
									{el.worker.id===""&&el.pendingRequest.map((request) => {
										return (
											<div className=' h-fit lg:w-[90%] md:w-[55vw] sm:w-[80%] border border-black rounded-lg flex flex-col p-2 mt-3'>
												<UserProfileBox request={request} data={el} />
											</div>
										);
									})}
									{(el.worker.id!=="")&&
									<div className=' h-fit lg:w-[90%] md:w-[55vw] sm:w-[80%] border border-black rounded-lg flex flex-col p-2 mt-3'>
										<h1>Хийх хүн</h1>
										<UserProfileBox request={el}/>
									</div>}
								</div>
							</ProfileCard>
						);
					})}
				</div>
			) : (
				<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
					{postIInterested.map((el, ind) => {
						return (
							<ProfileCard key={ind}>
								<PostReceived
									name={el.subject}
									owner={"oruulna"}
									description={el.detail}
								/>
								<div className='flex flex-row flex-wrap'>
									{buttonArr?.map((el, index): any => (
										<PostButton
											key={index}
											data={el.textValue}
											prop={el.style}
											ym={el.function}
										/>
									))}
									<PostButton
										data={isChatting ? "Дуусгах" : "Харилцах"}
										prop={"#FDFD96"}
										ym={async () => {
											await setChatRoom(el.chatRoom);
											setChatting(!isChatting);
										}}
									/>
								</div>
								{isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : <></>}
							</ProfileCard>
						);
					})}
				</div>
			)}
		</div>
	);
};
