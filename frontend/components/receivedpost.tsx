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
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	NativeSelect,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwipeableViews from "react-swipeable-views";
type postType = {
<<<<<<< HEAD
	subject: string;
	detail: string;
	worker: { id: string; averageRating: string; email: string };
	isDone: boolean;
	chatRoom: string;
	pendingRequest: [{ id: string; averageRating: string; email: string }];
}[];
export const ReceivedPosts = () => {
	const [personalPosts, setPersonalPosts] = useState<postType>([]);
	const [isChatting, setChatting] = useState(false);
	const [chatRoom, setChatRoom] = useState("");
	const [postIInterested, setPostIInterested] = useState<postType>([]);
	const { isAgainGetDatas, setIsAgainGetDatas } = useIsAgainGetDatas();
	const [value, setValue] = useState(0);
	const [open, setOpen] = useState(false);
	const [chattingReq, setChattingReq] = useState<string>("");
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
=======
  subject: string;
  detail: string;
  worker: { id: string; averageRating: string; email: string };
  isDone: boolean;
  chatRoom: string;
  _id:string,
  pendingRequest: [{ id: string; averageRating: string; email: string }];
}[];
export const ReceivedPosts = () => {
  const [personalPosts, setPersonalPosts] = useState<postType>([]);
  const [chosen, setChosen] = useState(true);
  const [isChatting, setChatting] = useState(false);
  const [chatRoom, setChatRoom] = useState("");
  const windowWidth = useWindowWidth();
  const [loading, setLoading] = useState(false);
  const [postIInterested, setPostIInterested] = useState<postType>([]);
  const { isAgainGetDatas,setIsAgainGetDatas } = useIsAgainGetDatas();
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
  const postedButtonArr = [
    {
      textValue: "Edit",
      style: "#C4FAF8",
      function: () => {},
    },
    {
      textValue: "Delete",
      style: "#FFABAB",
      function:async (el: React.MouseEvent<HTMLButtonElement>) => {
        const button: HTMLButtonElement = el.currentTarget;
        await instance
          .delete(`/post/${button.id}`)
          .then(function (response) {
            setIsAgainGetDatas((e:boolean) => !e);
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
>>>>>>> homePageMui

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
							console.log(el);
							return (
								<SomeCart
									type={el.isDone === true ? "done" : "notDone"}
									key={ind}>
									<PostReceived
										name={el.subject}
										owner={"oruuln"}
										description={el.detail}
									/>
									{/* <div className='flex flex-row flex-wrap'>
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
									</div> */}
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
												<>
													<h1>Хийх хүн</h1>

													<div className=' h-fit lg:w-[90%] md:w-[55vw] sm:w-[80%] flex flex-col p-2 mt-3'>
														<UserProfileBox
															request={el.worker}
															post={el}
														/>
													</div>
												</>
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
