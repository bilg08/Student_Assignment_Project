import {
	MenuList,
	MenuList2,
	ColasipbleSidebarBox,
	MyImage
} from "./index";
import { deleteCookie, getCookie } from "cookies-next";
import { useCollectionContext, useUserContext } from "../context/index";
import { useEffect, useState } from "react";
import axios from "axios";

export const UserSideBar = () => {
	const { user, setUser } = useUserContext();
	const [userInput, setUserInput] = useState(user)
	const [editing, setEditing] = useState(false);
	const { cActive, setCactive } = useCollectionContext();
	const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
	const [fileSelected, setFileSelected] = useState<any | null>([]);
	const isActive = true;

	const uploadFile = function (e: any) {
		if (e.target.files && e.target.files[0]) {
			const i = e.target.files[0];
			setFileSelected(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};
	const handleChange=(e:any)=>{
		setUserInput({ ...userInput, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		const getPersonalInfo = async () => {
			const token = getCookie("token");
			try {
				const datas = await axios.get("http://localhost:8000/users/myInfo", {
					headers: {
						Authorization: token,
					},
				});
				setUser(datas.data.data);
			} catch (error) {}
		};
		getPersonalInfo();
	}, []);

	return (
		<>
			<aside
				className='w-96 ml-24 h-[75vh]'
				aria-label='Sidebar'>
				<div className=' overflow-y-auto py-4 px-3 bg-white rounded-lg flex-col align-center items-center h-full border-2 border-dark-purple'>
					<ul className='space-y-2 '>
						{!editing ? (
							<div>
								<li className='flex justify-center'>
								<div className='h-64 w-64 rounded-full border-dark-purple border-2 mb-16 bg-white'></div>
							</li>
							<div className='border-2 border-dark-purple rounded-lg'>
							<MenuList
								name={user?.LastName}
								spanText={"Овог"}
							/>
							<MenuList
								name={user?.FirstName}
								spanText={"Нэр"}
							/>
							<MenuList
								name={user?.School}
								spanText={"Их сургууль"}
							/>
							<MenuList
								name={user?.level}
								spanText={"Курс"}
							/>
						</div>
							</div>
						) : (
							<div className='flex-column justify-center items-center w-full'>
								<MyImage src={createObjectURL} />
								<input
									className='block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none  '
									id='small_size'
									type='file'
									onChange={()=>{uploadFile}}/>
								<form >
									<label>Овог</label>
									<input className="w-full mt-2 pl-2 text-dark-purple rounded-lg border border-mid-purple" onChange={(e)=>handleChange(e)} type="text" />
									<label>Нэр</label>
									<input className="w-full mt-2 pl-2 text-dark-purple rounded-lg border border-mid-purple" onChange={(e)=>handleChange(e)} type="text" />
									<label>Сургууль</label>
									<input className="w-full mt-2 pl-2 text-dark-purple rounded-lg border border-mid-purple" onChange={(e)=>handleChange(e)} type="text"/>
									<label>Түвшин</label>
									<input className="w-full mt-2 pl-2 text-dark-purple rounded-lg border border-mid-purple" onChange={(e)=>handleChange(e)} type="text"/>
								</form>
							</div>
						)}
						
					</ul>
					<br />
					<ul className='space-y-2 border-t border-dark-purple '>
						<ColasipbleSidebarBox>
							<MenuList2
								onClick={() => {}}
								name={"Хийсэн бие даалтын тоо"}
								svg={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-6 h-6'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
										/>
									</svg>
								}
							/>
						</ColasipbleSidebarBox>
						<ColasipbleSidebarBox>
							<MenuList2
								onClick={() => {}}
								name={"Бие даалтын дундаж үнэлгээ"}
								svg={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-6 h-6'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z'
										/>
									</svg>
								}
							/>
						</ColasipbleSidebarBox>
						<div style={{ height: "0.8vw" }}></div>
						<MenuList2
							onClick={() => {
								setEditing(!editing);
							}}
							name={"Профайл өөрчлөх"}
							svg={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
									/>
								</svg>
							}
						/>
						<MenuList2
							onClick={() => {
								isActive ? setCactive(true) : setCactive(false);
							}}
							name={"Зар Нэмэх"}
							svg={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							}
						/>
						<MenuList2
							onClick={() => {
								deleteCookie("token");
								location.reload();
							}}
							name={"Гарах"}
							svg={
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 '
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
										clipRule='evenodd'></path>
								</svg>
							}
						/>
					</ul>
				</div>
			</aside>
		</>
	);
};
export const SeizedSideBar = () => {
	const { cActive, setCactive } = useCollectionContext();
	const isActive = true;
	return (
		<section
			id='bottom-navigation'
			className='block fixed inset-x-0 bottom-0 z-10 bg-dark-purple '>
			<div
				id='tabs'
				className='flex justify-center pl-4'>
				<ul className='flex items-center h-fit'>
					<MenuList2
						onClick={() => {}}
						name={""}
						svg={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-8 h-8 text-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
						}
					/>
					<MenuList2
						onClick={() => {}}
						name={""}
						svg={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-8 h-8 text-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
								/>
							</svg>
						}
					/>
					<MenuList2
						onClick={() => {}}
						name={""}
						svg={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor '
								className='w-8 h-8 text-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
								/>
							</svg>
						}
					/>
					<MenuList2
						onClick={() => {}}
						name={""}
						svg={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-8 h-8 text-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z'
								/>
							</svg>
						}
					/>
					<MenuList2
						onClick={() => {
							isActive ? setCactive(true) : setCactive(false);
						}}
						name={""}
						svg={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-8 h-8 text-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						}
					/>
					<MenuList2
						onClick={() => {
							deleteCookie("token");
							location.reload();
						}}
						name={""}
						svg={
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-white transition duration-75  group-hover:text-gray-900 '
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
									clipRule='evenodd'></path>
							</svg>
						}
					/>
				</ul>
			</div>
		</section>
	);
};
