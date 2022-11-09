import {
	MenuList,
	MenuList2,
	SidebarBox,
	SidebarBox2,
	ColasipbleSidebarBox,
} from "../components/index";
export const UserSideBar = () => {
	return (
		<>
			<aside
				className='w-96 ml-24 h-[100vh]'
				aria-label='Sidebar'>
				<div className=' overflow-y-auto py-4 px-3 bg-light-purple rounded-lg  flex-col align-center items-center h-full border border-light-purple'>
					<ul className='space-y-2 '>
						<li className='h-pcontainer flex justify-center align-center '>
							<div className='h-pheight w-pwidth rounded-full border-white border-2 shadow-sidebarbox mb-16 bg-white'></div>
						</li>

						{/* ovgig uurchluh */}
						<SidebarBox>
							<MenuList
								name={"Tsolmonbayar"}
								spanText={"Овог"}
								href={""}
							/>
							{/* neriig uurchluh */}
							<MenuList
								name={"Enerel"}
								spanText={"Нэр"}
								href={""}
							/>
						</SidebarBox>
						<SidebarBox>
							<MenuList
								name={"NUM"}
								spanText={"Их сургууль"}
								href={"/num"}
							/>
							<MenuList
								name={"1"}
								spanText={"Курс"}
								href={""}
							/>
						</SidebarBox>
					</ul>
					<ul className='pt-4 mt-4 space-y-2 border-t border-gray-200 '>
						<ColasipbleSidebarBox>
							<MenuList2
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
						<SidebarBox2>
							<MenuList2
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
						</SidebarBox2>

						<SidebarBox2>
							<MenuList2
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
								isActive={true}
							/>
						</SidebarBox2>

						<SidebarBox2>
							<MenuList2
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
						</SidebarBox2>
					</ul>
				</div>
			</aside>
		</>
	);
};
export const SeizedSideBar = () => {
	return (
		<aside
			className='fixed top-64 flex justify-center left-2 md:w-24 xs:w-48 h-fit'
			aria-label='Sidebar'>
			<div className=' overflow-y-auto py-4 px-3 bg-dark-purple rounded-lg flex-col align-center h-full border border-light-purple text-white'>
				<ul className='space-y-2 '>
					<MenuList2
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
									d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
								/>
							</svg>
						}
					/>
					<MenuList2
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
						isActive={true}
					/>
					<MenuList2
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
		</aside>
	);
};
