import { MenuItem, Select } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import cn from "classnames";
import { useEffect, useState } from "react";
import { IconArrow } from "../components/Icon/IconArrow";
import { instance } from "../components/Layout";
import { Pagination1 } from "../components/pagination";
import {
	useIsAgainGetDatas,
	useIsUserLoggedContext,
	useLoaderContext,
	useModalContext,
	useSearchContext,
	useSelectedContext,
} from "../context/index";
type adsType = {
	_id: string | number | readonly string[] | undefined;
	advertisingHeader: String;
	detail: string;
	owner: {
		FirstName: string;
		LastName: string;
		photo: string;
		_id: string;
	};
	school: string;
	subject: string;
	group: string;
	isDone: boolean;
	createdAt: String;
	photo?: string;
	price?: string;
};

export default function Home() {
	const { selectedAd, setSelectedAd } = useSelectedContext();
	const { setModalText, setOpenModal } = useModalContext();
	const [ads, setAds] = useState<adsType[]>([]);
	const [showModal, setShowModal] = useState(false);
	const { isAgainGetDatas, setIsAgainGetDatas } = useIsAgainGetDatas();
	const [page, setPage] = useState<number>(1);
	const [pagination, setPagination] = useState({ pageCount: 0 });
	const [closeDetailImage, setCloseDetailImage] = useState<boolean>(false);
	const { userInput, setUserInput } = useSearchContext();
	const [schools, setSchools] = useState<any>([]);
	const [schoolLessons, setSchoolLessons] = useState([]);
	const [schoolGroup, setSchoolGroup] = useState<any>([]);
	const { setOpenshadow } = useLoaderContext();
	const { isLoggedIn } = useIsUserLoggedContext();
	useEffect(() => {
		(async () => {
			if (!isLoggedIn) {
				try {
					const response = await instance.get(
						`/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
					);
					setAds(response.data.data);
					setPagination(response.data.pagination);
				} catch (error) {}
			} else {
				try {
					const response = await instance.get(
						`/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
					);
					setAds(response.data.data);
					setPagination(response.data.pagination);
				} catch (error) {}
			}
			await instance.get("/school").then(async function (response) {
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
			});
		})();
	}, [page, isAgainGetDatas]);

	useEffect(() => {
		schools.map((school1: any) => {
			if (school1.name === userInput.school) {
				school1.groupAndThatGrouplessons.map((group: any) => {
					setSchoolGroup((prev: any) => [...prev, group.GroupName]);
				});
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

	const handleSearch = () => {
		setShowModal(false);
		setSelectedAd(null);
		setIsAgainGetDatas((e: boolean) => !e);
	};
	const DetailImage = (props: { imageSrc: string }) => {
		return (
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 20,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				open={closeDetailImage}>
				<Button
					onClick={() => setCloseDetailImage(false)}
					variant='contained'>
					X
				</Button>
				<Grid className='w-[100%] h-[auto] flex justify-center'>
					<img
						style={{
							width: "80%",
						}}
						src={
							selectedAd &&
							`http://localhost:8000/post/photo/${selectedAd.ad.photo}`
						}
					/>
				</Grid>
			</Backdrop>
		);
	};

	return (
		<div className='w-full  border-#57534e border-1'>
			<Grid className='flex h-auto w-full m-auto justify-center flex-col items-center md:flex-row  max-w-screen-xl gap-5'>
				<Grid
					className='max-w-screen-xl flex justify-between'
					container
					sx={{
						width: { sm: "100%", xs: "100%", md: "95%", lg: "100%" },
						height: "auto",
						display: "flex",
						margin: "auto",
						alignItems: "center",
						gap: { sm: "20px" },
						flexFlow: { xs: "column", sm: "row" },
						marginTop: "2vw",
					}}>
					<Grid
						md={3}
						className='w-5/6 '
						item>
						<InputLabel
							className='font-bold'
							id='demo-simple-select-label'>
							Сургууль
						</InputLabel>
						<Select
							className='bg-[#ebecf0] my-2 md:flex relative pl-4 pr-0.5 py- h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full  text-gray-30 rounded-lg align-middle text-sm'
							name='school'
							value={userInput.school}
							onChange={async (e) => {
								await setUserInput({
									...userInput,
									[e.target.name]: e.target.value,
								});
							}}>
							{schools.map((school: { name: "" }, i: number) => (
								<MenuItem
									value={school.name}
									key={school.name + i}>
									{school.name}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid
						md={3}
						className='w-5/6'
						item>
						<InputLabel
							className='font-bold'
							id='demo-simple-select-label'>
							Бүлэг
						</InputLabel>
						<Select
							className='bg-[#ebecf0] my-2 md:flex relative pl-4 pr-0.5 py-1 h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full text-gray-30 rounded-lg align-middle text-sm'
							id='grid-state'
							name='group'
							value={userInput.group}
							onChange={async (e) => {
								await setUserInput({
									...userInput,
									[e.target.name]: e.target.value,
								});
							}}>
							<MenuItem value=''>Бүлэг</MenuItem>
							{schoolGroup?.map((group: string, i: string) => (
								<MenuItem
									value={group}
									key={group + i}>
									{group}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid
						md={3}
						className='w-5/6'
						item>
						<InputLabel
							className='font-bold'
							id='demo-simple-select-label'>
							Хичээл
						</InputLabel>
						<Select
							className='bg-[#ebecf0] my-2 md:flex relative pl-4 pr-0.5 py-1 h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full text-gray-30 rounded-lg align-middle text-sm'
							id='grid-state'
							onChange={async (e) => {
								await setUserInput({
									...userInput,
									[e.target.name]: e.target.value,
								});
							}}
							name={`subject`}>
							<MenuItem value=''>Хичээл</MenuItem>
							{schoolLessons?.map((schoolLesson: any, i: number) => {
								return (
									<MenuItem
										value={schoolLesson.subject}
										key={schoolLesson + i}>
										{schoolLesson.subject}
									</MenuItem>
								);
							})}
						</Select>
					</Grid>
					<button
						style={{ padding: "6px 15px", marginTop: "20px" }}
						className='bg-indigo-600 text-white rounded-lg'
						onClick={handleSearch}
						color='primary'>
						Хайх
					</button>
				</Grid>
			</Grid>
			<DetailImage imageSrc={selectedAd && selectedAd.ad.photo} />
			<Grid sx={{ width: "100%" }}>
				<Grid
					container
					sx={{
						position: "relative",
						display: "flex",
						maxWidth: "1300px",
						height: "60vh",
						overflow: "scroll",
						margin: "auto",
						gap: "15px",
						flexWrap: "wrap",
						marginTop: "3vw",
						flexDirection: "row",
						justifyContent: { sm: "center", xs: "center", lg: "space-between" },
					}}>
					{ads.map((ad, index) => {
						return (
							<Grid
								sx={{ width: "auto" }}
								key={index}
								onClick={() => {
									setSelectedAd({ ad, index });
								}}>
								<PostCart ad={ad} />
							</Grid>
						);
					})}
				</Grid>
			</Grid>
			<Pagination1
				pagination={pagination}
				setPage={setPage}
				page={page}
			/>
		</div>
	);
}

function PostCart({ ad }: { ad: any }) {
	const [readMore, setReadMore] = useState(false);
	const { setOpenshadow } = useLoaderContext();
	const { setModalText, setOpenModal } = useModalContext();

	async function requestToDoWork(id: String) {
		await instance
			.post(`/post/${id}/work`)
			.then(async function (response) {
				setOpenshadow(true);
				await setModalText("amjilttai");
				setOpenModal(true);
			})
			.catch(async function (error) {
				setOpenshadow(true);
				await setModalText(error.response.data.data);
				setOpenModal(true);
			});
	}
	return (
		<div className='px-5 py-4 bg-white w-[400px] h-[250px] shadow-2xl rounded-lg max-w-lg'>
			<div className='flex mb-4'>
				<img
					className='w-12 h-12 rounded-full'
					src={`http://localhost:8000/users/getUserProfilePhoto/${ad.owner.photo}`}
				/>
				<div className='ml-2 mt-0.5'>
					<span className='block font-medium text-base leading-snug text-black '>
						{ad.owner.FirstName}
					</span>
					<span className='block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug'>
						16 December at 08:25
					</span>
				</div>
			</div>
			<div className='text-gray-800 0 flex gap-[10px] leading-snug md:leading-normal'>
				<a
					className={cn(
						"inline text-code bg-blue-100  text-secondary dark:text-secondary-dark px-1 rounded-md no-underline"
					)}>
					{ad.school}
				</a>

				<a
					className={cn(
						"inline text-code bg-blue-100  text-secondary dark:text-secondary-dark px-1 rounded-md no-underline"
					)}>
					{ad.subject}
				</a>
			</div>
			<p
				className={` text-gray-800 overflow-hidden transition-all    leading-snug md:leading-normal`}>
				{ad.detail.length > 50 ? (
					<div>
						{!readMore ? (
							<div>
								<p>{ad.detail.slice(0, 50)}</p>
								<a
									onClick={() => setReadMore(true)}
									className='underline text-blue-500'>
									Цааш нь унших
								</a>
							</div>
						) : (
							<div>
								<p>{ad.detail}</p>
								<a
									onClick={() => setReadMore(false)}
									className='underline text-blue-500'>
									Хураах
								</a>
							</div>
						)}
					</div>
				) : (
					<p>{ad.detail}</p>
				)}
			</p>
			<div className='flex justify-between items-center mt-5'></div>
			<button
				onClick={() => requestToDoWork(ad._id)}
				type='button'
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}
				className='px-6 py-2.5 mx-2 mb-2 rounded-xl bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
				Хийх
				<IconArrow displayDirection='right' />
			</button>
		</div>
	);
}
