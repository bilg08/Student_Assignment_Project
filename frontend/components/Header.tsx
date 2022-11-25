import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	useIsAgainGetDatas,
	useIsUserLoggedContext,
	usePostStateContext,
} from "../context";
import { useWindowWidth } from "../hooks";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Input, Button, Card, Shadow, PostButton } from "./index";
type userInputType = {
	subject: String | "subject";
	school: String | "school";
};
export const Header = () => {
	const router = useRouter();
	const windowWidth = useWindowWidth();
	const { isLoggedIn } = useIsUserLoggedContext();
	const { receivedPost, setReceivedPost } = usePostStateContext();
	const [userInput, setUserInput] = useState<userInputType | object>({
		school: "",
		subject: "",
	});
	const { setIsAgainGetDatas } = useIsAgainGetDatas();
	const handleSearch = () => {
		console.log(userInput);
		setIsAgainGetDatas((e: boolean) => !e);
	};
	return (
		<header>
			<nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 '>
				<div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
					<div
						onClick={() => {
							router.push("/");
						}}
						className='flex items-center'>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
							className='mr-3 h-6 sm:h-9'
							alt='Flowbite Logo'
						/>
						<span className='self-center text-xl font-semibold whitespace-nowrap '>
							React
						</span>
					</div>
					<div>
						{router.pathname === "/" ? (
							<div className='flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5'>
								<Input
									placeholder='Сургууль'
									onchange={setUserInput}
									userInput={userInput}
									icon={<AiOutlineSearch />}
									name='school'
								/>
								<Input
									placeholder='Хичээл'
									onchange={setUserInput}
									userInput={userInput}
									name='subject'
									icon={<MdLocationOn />}
								/>
								<Button onClick={handleSearch}>Хайх</Button>
							</div>
						) : windowWidth >= 950 ? (
							<div className=' h-[50px] w-[35vw]  pr-2 z-10 bg-white flex justify-evenly items-end'>
								<h1
									className={`${
										windowWidth <= 1300 ? "text-[2.4vw]" : "text-[1.4vw]"
									} text-center mt-4`}>
									{false ? "Миний зар" : "Хүлээн авсан зар"}
								</h1>
								<Button onClick={() => setReceivedPost(!receivedPost)}>
									{receivedPost ? "Хүлээн авсан зар →" : "Миний зар →"}
								</Button>
							</div>
						) : (
							<Button onClick={() => setReceivedPost(!receivedPost)}>
								{receivedPost ? "Хүлээн авсан зар →" : "Миний зар →"}
							</Button>
						)}
					</div>
					<div className='flex items-center lg:order-2'>
						<div
							style={{ display: isLoggedIn ? "none" : "block" }}
							onClick={() => router.push("loginPage")}
							className='z-10 text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none '>
							Нэвтрэх/Бүртгүүлэх
						</div>
						<div
							style={{ display: isLoggedIn ? "block" : "none" }}
							onClick={() => router.push("profile")}
							className='z-10 text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none '>
							Миний хэсэг
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
