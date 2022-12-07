import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography
} from "@mui/material";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import { instance } from "../components/Layout";
import {
	useCollectionContext,
	useIsAgainGetDatas,
	useIsUserLoggedContext, useSidebarContext,
	useUserContext
} from "../context/index";
import { MenuList, MenuList2, MyImage } from "./index";

export const UserSideBar = () => {
	const { user, setUser } = useUserContext();
	const {isLoggedIn} = useIsUserLoggedContext()
	const [editing, setEditing] = useState(false);
	const { setIsAgainGetDatas, isAgainGetDatas } = useIsAgainGetDatas();
	const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
	const [fileSelected, setFileSelected] = useState<any | null>([]);
	const uploadFile = function (e: any) {
		if (e.target.files && e.target.files[0]) {
			const i = e.target.files[0];
			setFileSelected(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};
	const handleChange = async (e: any) => {
		if (e.target.name === "photo") {
			setUser({ ...user, [e.target.name]: e.target.files[0] });
		} else if (e.target.value === "") {
			return;
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setEditing(false);
		let formDatas = new FormData();
		formDatas.append("FirstName", user.FirstName);
		formDatas.append("LastName", user.LastName);
		formDatas.append("School", user.School);
		formDatas.append("Level", user.level);
		formDatas.append("file", user.photo);
		await instance
			.post("/users/updateMe", formDatas, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(() => {
				setIsAgainGetDatas((e: boolean) => !e);
			})
			.catch((err) => console.log(err));
	};

	
	return (
		<div>
			<aside
				className='w-96 h-[75vh]'
				aria-label='Sidebar'>
				<div className=' overflow-y-scroll py-4 px-3 bg-white rounded-lg flex-col align-center items-center h-full'>
					<ul className='space-y-2'>
						<div className='overflow-y-scroll'>
							<li className='flex justify-center'>
								
								<img
									alt=''
									className='h-48 w-48 rounded-full border-dark-purple border-2 mb-4 p-0.5'
									src={
										(isLoggedIn&&user.photo) === "no-photo.png"
											? "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396__340.png"
											: `http://localhost:8000/users/getUserProfilePhoto/${user.photo}`
									}
								/>
								<svg
									onClick={() => {
										setEditing(!editing);
									}}
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-9 h-9 px-1 relative top-36 right-12 z-10 bg-white rounded-full border border-dark-purple'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
									/>
								</svg>
							</li>
							<div className=' rounded-lg'>
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
								<MenuList
									name={user?.averageRating + "%"}
									spanText={"Дундаж үнэлгээ"}
								/>
							</div>
						</div>
					</ul>
					<br />
					<ul className='space-y-2 border-t '>
						<Accordion
							sx={{
								border: "none",
								marginTop: "7%",
								borderRadius: "5px",
							}}>
							<AccordionSummary>Хийсэн бие даалтын тоо</AccordionSummary>
							<AccordionDetails>
								{user?.averageRatingByGroupByGroup.map((el) => {
									return (
										<Typography key={el._id}>
											{el._id} : {el.sum}
										</Typography>
									);
								})}
							</AccordionDetails>
						</Accordion>
						<Accordion
							sx={{
								marginTop: "7%",
								borderRadius: "5px",
							}}>
							<AccordionSummary>Дундаж Үнэлгээ</AccordionSummary>
							<AccordionDetails>
								{user?.averageRatingByGroupByGroup.map((el) => {
									return (
										<Typography key={el._id}>
											{el._id} : {el.avg}
										</Typography>
									);
								})}
							</AccordionDetails>
						</Accordion>
						<div style={{ height: "0.8vw" }}></div>
					</ul>
				</div>
			</aside>
			<Dialog open={editing}>
				<DialogTitle
					sx={{
						margin: "5px",
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}>
					-Профайл Өөрчлөх-
				</DialogTitle>
				<DialogContent>
					<div
						className={`justify-center items-center w-full overflow-y-scroll`}>
						<form
							onSubmit={(e) => {
								handleSubmit(e);
							}}>
							<div className='flex-column items-center'>
								<MyImage src={createObjectURL} />
								<label
									style={{
										color: "#804fb3",
										width: "100%",
										display: "flex",
										marginBottom: "8px",
										border: "1px solid #804fb3",
										borderRadius: "15px",
										padding: "4px",
									}}>
									<AddCircleIcon
										sx={{ color: "#804fb3", marginRight: "5px" }}
									/>
									Зураг сонгох
									<input
										style={{ display: "none" }}
										className='block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg cursor-pointer  focus:outline-none  '
										id='small_size'
										type='file'
										onChange={(e) => {
											uploadFile(e);
											handleChange(e);
										}}
										name='photo'
									/>
								</label>
							</div>

							<label className='text-dark-purple'>Овог</label>
							<input
								placeholder={user.LastName}
								className='w-full mt-2 pl-2 text-mid-purple rounded-lg  mb-2 placeholder-mid-purple'
								onChange={handleChange}
								type='text'
								name='LastName'
							/>
							<label className='text-dark-purple'>Нэр</label>
							<input
								placeholder={user.FirstName}
								className='w-full mt-2 pl-2 text-mid-purple rounded-lg  mb-2 placeholder-mid-purple'
								onChange={handleChange}
								type='text'
								name='FirstName'
							/>
							<label className='text-dark-purple'>Сургууль</label>
							<select
								placeholder='Сургууль'
								className='border border-mid-purple w-full mt-2 rounded-lg p-0.5 text-mid-purple mb-2 '
								name='School'
								id=''
								onChange={handleChange}>
								<option value=''></option>
								<option value='NUM'>NUM</option>
								<option value='UFE'>UFE</option>
								<option value='MUST'>MUST</option>
							</select>
							<label className='text-dark-purple'>Түвшин</label>
							<input
								placeholder={user.level}
								className='w-full mt-2 pl-2 text-mid-purple rounded-lg border border-mid-purple mb-2 placeholder-mid-purple'
								onChange={handleChange}
								type='text'
								name='level'
							/>
							<div className='flex justify-between items-center mt-2'>
								<input
									type='submit'
									className='w-[49%] hover:bg-white hover:text-dark-purple text-white bg-dark-purple rounded-lg border border-dark-purple'
								/>
								<input
									type='button'
									value='Cancel'
									onClick={() => {
										location.reload();
										setEditing(false);
									}}
									className='w-[49%] hover:bg-white hover:text-dark-purple text-white bg-dark-purple rounded-lg border border-dark-purple'
								/>
							</div>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
export const SeizedSideBar = () => {
	const { cActive, setCactive } = useCollectionContext();
	const isActive = true;
	const { setBigsidebar, bigsidebar } = useSidebarContext();
	return (
		<section
			id='bottom-navigation'
			className='block fixed inset-x-0 bottom-0 z-10 bg-dark-purple '>
			<div
				id='tabs'
				className='flex justify-center pl-4'>
				<ul className='flex items-center h-fit'>
					<MenuList2
						onClick={() => setBigsidebar(!bigsidebar)}
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
							deleteCookie("userId");
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
