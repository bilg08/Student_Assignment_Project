import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import { ProfileCard, Button } from "../components/index";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
export const ReceivedPosts = () => {
	const [personalPosts, setPersonalPosts] = useState([
		{
			subject: "",
			detail: "",
			pendingRequest: [{ id: "", averageRating: "", email: "" }],
		},
	]);
	useEffect(() => {
		const getPersonalData = async () => {
			const token = getCookie("token");

			try {
				const datas = await axios.get("http://localhost:8000/users/posts", {
					headers: {
						Authorization: token,
					},
				});
				console.log(datas.data);
				setPersonalPosts(datas.data.data);
				console.log(personalPosts);
			} catch (error) {}
		};
		getPersonalData();
	}, []);
	const buttonArr = [
		{
			textValue: "Chat",
			style: "#DCD3FF",
			function: () => console.log("chat"),
		},
		{
			textValue: "Submit",
			style: "#BFFCC6",
			function: () => console.log("submit"),
		},
		{
			textValue: "Cancel",
			style: "#FFABAB",
			function: () => console.log("cancel"),
		},
	];
	const postedButtonArr = [
		{
			textValue: "Chat",
			style: "#DCD3FF",
			function: () => console.log("chat"),
		},
		{
			textValue: "Edit",
			style: "#C4FAF8",
			function: () => console.log("edit"),
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
						console.log(response);
					});
			},
		},
	];
	const [chosen, setChosen] = useState(true);
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
									<div>
										{el.pendingRequest.map((request) => {
											return (
												<div className='flex justify-between w-[400px] items-center'>
													Имайл:{request.email},Дундаж үнэлгээ:
													{request.averageRating}
													<PostButton
														data={"confirm"}
														prop={"rgb(225 29 72)"}
													/>
												</div>
											);
										})}
									</div>
								</div>
							</ProfileCard>
						);
					})}
				</div>
			) : (
				<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
					{personalPosts.map((el, ind) => {
						console.log(el);
						return (
							<ProfileCard key={ind}>
								<PostReceived
									name={el.subject}
									owner={"oruuln"}
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
								</div>
								<div>
									{el.pendingRequest.map((request) => {
										return (
											<div>
												<p>{request.email}</p>
												<p>{request.averageRating}</p>
											</div>
										);
									})}
								</div>
							</ProfileCard>
						);
					})}
				</div>
			)}
		</div>
	);
};
