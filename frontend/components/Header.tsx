import { useRouter } from "next/router";
import { useIsUserLoggedContext } from "../context";
export const Header = () => {
	const router = useRouter();
	const { isLoggedIn } = useIsUserLoggedContext();
	return (
		<header>
			<nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 '>
				<div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
					<a
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
					</a>
					<div className='flex items-center lg:order-2'>
						<a
							style={{ display: isLoggedIn ? "none" : "block" }}
							onClick={() => router.push("loginPage")}
							className='z-10 text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none '>
							Нэвтрэх/Бүртгүүлэх
						</a>
						<a
							style={{ display: isLoggedIn ? "block" : "none" }}
							onClick={() => router.push("profile")}
							className='z-10 text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none '>
							Миний хэсэг
						</a>
					</div>
					<div
						className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'
						id='mobile-menu-2'>
						<ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
							<li
								onClick={() => {
									router.push("/");
								}}>
								<a className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 '>
									Ажил Хайх
								</a>
							</li>
							<li>
								<a
									href='#'
									className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 '>
									Эрэлттэй хүмүүс
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
