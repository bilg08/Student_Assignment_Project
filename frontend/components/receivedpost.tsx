import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import { ProfileCard, Button } from "../components/index";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
export const ReceivedPosts = () => {
	const [personalPosts, setPersonalPosts] = useState([]);
	useEffect(() => {
		const getPersonalData = async () => {
			const token = getCookie("token");
			console.log(token);

			try {
				const datas = await axios.get("http://localhost:8000/users/posts", {
					headers: {
						Authorization: token,
					},
				});
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
									{postedButtonArr?.map((el, index): any => (
										<PostButton
											key={index}
											data={el.textValue}
											prop={el.style}
											ym={el.function}
										/>
									))}
								</div>
							</ProfileCard>
						);
					})}
				</div>
			)}
		</div>
	);
};
