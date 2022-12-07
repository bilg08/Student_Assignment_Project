import { ReactNode, SyntheticEvent, useState, useEffect } from "react";
import { useIsAgainGetDatas } from "../context";
import {
	instance,
	SomeCart,
	ColasipbleChatBox,
	UserProfileBox,
	PostButton,
	PostReceived,
} from "../components/index";
import {
	Box,
	Typography,
	Tabs,
	Tab,
	InputLabel,
	FormControl,
	NativeSelect,
} from "@mui/material";
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
	const [chatRoom, setChatRoom] = useState("");
	const [postIInterested, setPostIInterested] = useState<postType>([]);
	const { isAgainGetDatas, setIsAgainGetDatas } = useIsAgainGetDatas();
	const [value, setValue] = useState(0);
	const [chattingReq, setChattingReq] = useState<string>("");
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};
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
			try {
				const datas = await instance.get(`/users/posts`);
				setPersonalPosts(datas.data.data);
			} catch (error) {}
		};
		getPostIInterested();
		getPersonalData();
	}, [isAgainGetDatas]);

	return (
		<div className='flex-col items-center lg:w-4/6 md:w-full xs:w-full h-[100%]  m-auto overflow-auto h-screen  overscroll-y-scroll lg:ml-20 '>
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
					label='Туслах зар'
					{...a11yProps(1)}
				/>
			</Tabs>

			<SwipeableViews
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
									{!el.isDone && (
										<div>
											<div
												className='flex-row mt-4'
												style={{
													display:
														(!el.isDone && el.worker.email) == ""
															? "block"
															: "none",
												}}>
												<FormControl
													sx={{
														borderTop: "none",
														marginBottom: "10px",
													}}
													fullWidth>
													<InputLabel
														variant='standard'
														htmlFor='uncontrolled-native'
														sx={{
															color: "green",
															fontSize: "18px",
															font: "Roboto",
															marginBottom: "4px",
														}}>
														Хийх хүсэлтүүд
													</InputLabel>
													<NativeSelect
														onChange={(e) => setChattingReq(e.target.value)}>
														<option></option>
														{el.worker.id == "" &&
															el.pendingRequest.map((request) => {
																return (
																	<option value={request.email}>
																		{request.email}
																	</option>
																);
															})}
													</NativeSelect>
												</FormControl>
												{chattingReq !== "" &&
													el.pendingRequest.map(
														(ele) =>
															ele.email === chattingReq && (
																<UserProfileBox
																	request={ele}
																	post={el}
																/>
															)
													)}
											</div>

											{el.worker.email !== "" && !el.isDone && (
												<div>
													<h1>Хийх хүн</h1>

													<div className=' h-fit lg:w-[90%] md:w-[55vw] sm:w-[80%] flex flex-col p-2 mt-3'>
														<UserProfileBox
															request={el.worker}
															post={el}
														/>
													</div>
												</div>
											)}
										</div>
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
								<ChatBox
									setChatRoom={setChatRoom}
									chatRoom={chatRoom}
									el={el}
									ind={ind}
								/>
							);
						})}
					</div>
				</TabPanel>
			</SwipeableViews>
		</div>
	);
};
function ChatBox({
	el,
	ind,
	setChatRoom,
	chatRoom,
}: {
	el: any;
	ind: number;
	setChatRoom: any;
	chatRoom: any;
}) {
	const [isChatting, setChatting] = useState(false);
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
					<PostButton
						data={isChatting ? "Дуусгах" : "Харилцах"}
						prop={"#FDFD96"}
						ym={async () => {
							setChatRoom(el.chatRoom);
							setChatting(!isChatting);
						}}
					/>
				</div>
				{isChatting ? <ColasipbleChatBox chatRoomName={chatRoom} /> : ""}
			</div>
		</SomeCart>
	);
}
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
					<Box>{children}</Box>
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
