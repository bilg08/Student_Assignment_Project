import { ReactNode, SyntheticEvent, useState, useEffect } from "react";
import { useIsAgainGetDatas } from "../context";
import { getCookie } from "cookies-next";
import {
	instance,
	SomeCart,
	ColasipbleChatBox,
	UserProfileBox,
	PostButton,
	PostReceived,
} from "../components/index";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
type postType = {
	subject: string;
	detail: string;
	worker: { id: string; averageRating: string; email: string };
	isDone: boolean;
	chatRoom: string;
	pendingRequest: [{ id: string; averageRating: string; email: string }];
}[];
export const ReceivedPosts = () => {
	const [personalPosts, setPersonalPosts] = useState<postType>([]);
	const [chosen, setChosen] = useState(true);
	const [isChatting, setChatting] = useState(false);
	const [chatRoom, setChatRoom] = useState("");
	const [postIInterested, setPostIInterested] = useState<postType>([]);
	const { isAgainGetDatas, setIsAgainGetDatas } = useIsAgainGetDatas();
	useEffect(() => {
		const getPostIInterested = async () => {
			try {
				const datas = await instance.get(`/post/postToBeDone`);
				setPostIInterested(datas.data.data);
			} catch (error) {
			} finally {
			}
		};
		const getPersonalData = async () => {
			const token = getCookie("token");
			try {
				const datas = await instance.get(`/users/posts`);
				setPersonalPosts(datas.data.data);
			} catch (error) {}
		};
		getPostIInterested();
		getPersonalData();
	}, [isAgainGetDatas]);
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};
	const postedButtonArr = [
		{
			textValue: "Edit",
			style: "#C4FAF8",
			function: () => {},
		},
		{
			textValue: "Delete",
			style: "#FFABAB",
			function: async (el: React.MouseEvent<HTMLButtonElement>) => {
				const button: HTMLButtonElement = el.currentTarget;
				await instance.delete(`/post/${button.id}`).then(function (response) {
					setIsAgainGetDatas((e: boolean) => !e);
				});
			},
		},
	];
	const buttonArr = [
		{
			textValue: "Submit",
			style: "#C4FAF8",
		},
		{
			textValue: "Cancel",
			style: "#FFABAB",
			function: () => {},
		},
	];

	return (
		<div className='flex-col items-center lg:w-4/6 md:w-full xs:w-full h-[100%]  m-auto overflow-auto h-screen  overscroll-y-scroll ml-20'>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor='secondary'
				textColor='inherit'
				variant='fullWidth'
				aria-label='full width tabs example'>
				<Tab
					label='Миний зар'
					{...a11yProps(0)}
				/>
				<Tab
					label='Хийх зар'
					{...a11yProps(1)}
				/>
			</Tabs>

			<SwipeableViews
				// axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}>
				<TabPanel
					index={0}
					value={0}>
					<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
						{personalPosts?.map((el, ind) => {
							return (
								<SomeCart
									type={el.isDone === true ? "done" : "notDone"}
									key={ind}>
									<PostReceived
										name={el.subject}
										owner={"oruuln"}
										description={el.detail}
									/>
									<div className='flex flex-row flex-wrap'>
										{postedButtonArr?.map(
											(button, index): any =>
												!el.isDone && (
													<PostButton
														key={index}
														id={el._id}
														data={button.textValue}
														prop={button.style}
														ym={button.function}
													/>
												)
										)}
									</div>
									{!el.isDone ? (
										<div>
											<h1>Хийх хүсэлтүүд:</h1>
											{el.worker.id == "" &&
												el.pendingRequest.map((request) => {
													return (
														<div className=' h-fit lg:w-[90%] md:w-[55vw] sm:w-[80%] border border-black rounded-lg flex flex-col p-2 mt-3'>
															<UserProfileBox
																request={request}
																post={el}
															/>
														</div>
													);
												})}
											{el.worker.id && (
												<>
													<h1>Хийх хүн</h1>

													<div className=' h-fit lg:w-[90%] md:w-[55vw] sm:w-[80%] border border-black rounded-lg flex flex-col p-2 mt-3'>
														<UserProfileBox
															request={el.worker}
															post={el}
														/>
													</div>
												</>
											)}
										</div>
									) : (
										<div>Энэ зар дууссан</div>
									)}
								</SomeCart>
							);
						})}
					</div>
				</TabPanel>
				<TabPanel
					index={1}
					value={value}>
					<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
						{postIInterested.map((el, ind) => {
							return (
								<SomeCart
									type={el.isDone === true ? "done" : "notDone"}
									key={ind}>
									<PostReceived
										name={el.subject}
										owner={"oruuln"}
										description={el.detail}
									/>
									<div style={{ display: el.isDone ? "none" : "block" }}>
										<div className='flex flex-row flex-wrap'>
											{buttonArr?.map((button, index): any => (
												<PostButton
													key={index}
													data={button.textValue}
													prop={button.style}
													ym={button.function}
												/>
											))}
											<PostButton
												data={isChatting ? "Дуусгах" : "Харилцах"}
												prop={"#FDFD96"}
												ym={async () => {
													setChatRoom(el.chatRoom);
													setChatting(!isChatting);
												}}
											/>
										</div>
										{isChatting ? (
											<ColasipbleChatBox chatRoomName={chatRoom} />
										) : (
											""
										)}
									</div>
								</SomeCart>
							);
						})}
					</div>
				</TabPanel>
			</SwipeableViews>
		</div>
	);
};
interface TabPanelProps {
	children?: ReactNode;
	dir?: string;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}
