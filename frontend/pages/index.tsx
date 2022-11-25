import { useEffect, useState } from "react";
import { Shadow, PostButton, Button } from "../components/index";
import {
	useSelectedContext,
	useIsAgainGetDatas,
	useSearchContext,
} from "../context/index";
import { useWindowWidth } from "../hooks/index";
import { useModalContext } from "../context/index";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Pagination } from "../components/pagination";
type adsType = {
	_id: string | number | readonly string[] | undefined;
	advertisingHeader: String;
	detail: String;
	owner: {
		name: String;
		image: String | any;
	};
	createdAt: String;
	photo?: string;
	price?: string;
};

const instance = axios.create({
	baseURL: "http://localhost:8000.",
	timeout: 1000,
	headers: { authorization: getCookie("token") },
});

export default function Home() {
	const { selectedAd, setSelectedAd } = useSelectedContext();
	const { setModalText, setOpenModal } = useModalContext();
	const [ads, setAds] = useState<adsType[]>([]);
	const windowWidth = useWindowWidth();
	const [showModal, setShowModal] = useState(false);
	const { isAgainGetDatas, setIsAgainGetDatas } = useIsAgainGetDatas();
	const [page, setPage] = useState<number>(1);
	const [pagination, setPagination] = useState({ pageCount: 0 });
	const [closeDetailImage, setCloseDetailImage] = useState<boolean>(false);
	const { userInput, setUserInput } = useSearchContext();
	const [schools, setSchools] = useState<any>([]);
	const [schoolLessons, setSchoolLessons] = useState([]);
	const [schoolGroup, setSchoolGroup] = useState<any>([]);

	useEffect(() => {
		const token = getCookie("userId");
		async function getData() {
			await axios({
				method: "get",
				url: `http://localhost:8000/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`,
				headers: {
					userId: token,
				},
			})
				.then(async function (response) {
					setAds(response.data.data);
					setPagination(response.data.pagination);
				})
				.catch(function (response) {
					console.log(response);
				});
		}

		getData();
	}, [isAgainGetDatas, page]);

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
	const requestToDoWork = async (id: String) => {
		const token = getCookie("token");
		console.log(id);
		await axios({
			method: "post",
			url: `http://localhost:8000/post/${id}/work`,
			headers: { authorization: token },
		})
			.then(async function (response) {
				await setModalText("amjilttai");
				setOpenModal(true);
			})
			.catch(async function (error) {
				console.log(error);

				await setModalText(error.response.data.data);
				setOpenModal(true);
			});
	};
	const handleSearch = () => {
		setIsAgainGetDatas((e: boolean) => !e);
	};
	const DetailImage = (props: { imageSrc: string }) => {
		return (
			<div
				style={{ display: selectedAd && closeDetailImage ? "flex" : "none" }}
				className='w-[100%] h-[150vh] bg-grey/3 backdrop-blur-xl absolute z-30'>
				<button
					onClick={() => setCloseDetailImage(false)}
					className='absolute w-8 h-8 mt-3 ml-3 bg-gray-200 rounded-full'>
					X
				</button>
				<div className='w-[100%] h-[auto] justify-self-center'>
					<img
						style={{
							margin: `auto`,
							width: "80%",
							height: "auto",
							marginTop: "3vw",
						}}
						src={selectedAd && props.imageSrc}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className='w-full border-#57534e border-1'>
			<DetailImage
				imageSrc={
					selectedAd &&
					`https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
				}
			/>
			<div>
				<div className='flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5'>
					<select
						className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						name='school'
						onChange={async (e) => {
							await setUserInput({
								...userInput,
								[e.target.name]: e.target.value,
							});
						}}>
						{schools.map((school: { name: "" }, i: number) => (
							<option
								value={school.name}
								key={school.name + i}>
								{school.name}
							</option>
						))}
					</select>
					<select
						className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						onChange={async (e) => {
							await setUserInput({
								...userInput,
								[e.target.name]: e.target.value,
							});
						}}
						name='group'>
						{schoolGroup?.map((group: string, i: string) => (
							<option key={group + i}>{group}</option>
						))}
					</select>
					<select
						className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						onChange={async (e) => {
							await setUserInput({
								...userInput,
								[e.target.name]: e.target.value,
							});
						}}
						name='subject'>
						{schoolLessons?.map((schoolLesson: any, i: number) => {
							return (
								<option key={schoolLesson + i}>{schoolLesson.subject}</option>
							);
						})}
					</select>
					{/* <Input
									placeholder='Сургууль'
									onchange={setUserinput}
									userInput={userinput}
									icon={<AiOutlineSearch />}
									name='school'
								/> */}
					{/* <Input
                  placeholder="Хичээл"
                  onchange={setUserinput}
                  userInput={userinput}
                  name="subject"
                  icon={<MdLocationOn />}
                /> */}
					<Button onClick={handleSearch}>Хайх</Button>
				</div>
			</div>
			<div style={{ height: "auto" }}>
				<div className='max-w-screen-xl m-auto min-h-screen flex  justify-center items-baseline relative'>
					{/* //Бүх зараа үзүүлэх хэсэг */}
					<div className='m-5 w-6/12 min-w-[330px] flex flex-col m-auto gap-10 overflow-scroll'>
						{ads.map((ad, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										setSelectedAd({ ad, index });
										setShowModal(true);
									}}
									className='max-w-sm bg-white border border-mid-purple rounded-lg shadow-md'>
									<img
										className='rounded-t-lg'
										src='https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
										alt=''
									/>
									<div className='p-5'>
										<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
											{ad.advertisingHeader}
										</h5>
										<p className='mb-3 font-normal text-gray-700 '>
											{ad.detail}
										</p>

										<PostButton data={"Дэлгэрэнгүй"} />
									</div>
								</div>
							);
						})}
					</div>
					{/* ************************************************************************************** */}

					{/* Jijig delgetsen deer haragdah  zarnii delgerengui  */}

					{selectedAd && showModal && windowWidth < 935 && (
						<Shadow>
							<div className='min-w-[330px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-md '>
								<img
									onClick={() => setCloseDetailImage(true)}
									className='rounded-t-lg'
									src='https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
									alt=''
								/>
								<div className='p-5'>
									<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
										{selectedAd.ad.advertisingHeader}
									</h5>
									<p className='mb-3 font-normal text-gray-700 '>
										Here are the biggest enterprise technology acquisitions of
										2021 so far, in reverse chronological order.
									</p>
									<div className='flex'>
										<PostButton
											prop={"#e6d1f2"}
											data={"Xийх"}
											ym={() => requestToDoWork(selectedAd.index)}
										/>
										<PostButton
											ym={() => setShowModal(false)}
											data={"Гарах"}
											prop={"#C4FAF8"}
										/>
									</div>
								</div>
							</div>
						</Shadow>
					)}
					{/* ************************************************************************************************ */}

					{/* Tom delgetsen deer haragdah  zarnii delgerengui  */}
					{selectedAd && windowWidth > 935 && (
						// 	<div
						<div className='max-w-sm bg-white border border-mid-purple rounded-lg shadow-md '>
							<img
								onClick={() => setCloseDetailImage(true)}
								className='rounded-t-lg'
								src='https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
								alt=''
							/>
							<div className='p-5'>
								<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
									{selectedAd.ad.advertisingHeader}
								</h5>
								<p className='mb-3 font-normal text-gray-700 '>
									Here are the biggest enterprise technology acquisitions of
									2021 so far, in reverse chronological order.
								</p>
								<PostButton
									ym={() => {
										requestToDoWork(selectedAd.ad._id);
									}}
									data={"Хийх"}
									prop={"#e6d1f2"}
								/>
							</div>
						</div>
					)}

					{/* ************************************************************************************************ */}
				</div>
				<Pagination
					pagination={pagination}
					setPage={setPage}
					page={page}
				/>
			</div>
		</div>
	);
}
