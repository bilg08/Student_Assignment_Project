import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	useIsUserLoggedContext,
	usePostStateContext,
	useSearchContext,
} from "../context";
import { useWindowWidth } from "../hooks";
import axios from "axios";

export const Header = () => {
	const { userInput, setUserInput } = useSearchContext();
	const [schoolLessons, setSchoolLessons] = useState([]);
	const [schools, setSchools] = useState<any>([]);
	const [schoolGroup, setSchoolGroup] = useState<any>([]);
	const router = useRouter();
	const windowWidth = useWindowWidth();
	const { isLoggedIn } = useIsUserLoggedContext();
	const { receivedPost, setReceivedPost } = usePostStateContext();

	useEffect(() => {
		const getData = async () =>
			await axios({
				method: "get",
				url: "http://localhost:8000/school",
			})
				.then(async function (response) {
					setSchools([]);
					response.data.data.map(
						(school: { school: ""; ROOT: { group: [] } }) => {
							setSchools((schools: any) => [
								...schools,
								{
									name: school.school,
									groupAndThatGrouplessons: school.ROOT.group,
								},
							]);
						}
					);
				})
				.catch(function (response) {});
		getData();
		return () => {
			getData();
		};
	}, []);

	useEffect(() => {
		schools.map((school1: any) => {
			if (school1.name === userInput.school) {
				school1.groupAndThatGrouplessons.map((group: any) =>
					setSchoolGroup((prev: any) => [...prev, group.GroupName])
				);
			}
		});
	}, [userInput.school, userInput.group]);
	useEffect(() => {
		schools.map((school1: any) => {
			if (school1.name === userInput.school) {
				school1.groupAndThatGrouplessons.map((group1: any) => {
					if (group1.GroupName === userInput.group) {
						setSchoolLessons(group1.course);
					}
				});
			}
		});
	}, [userInput.group]);

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
