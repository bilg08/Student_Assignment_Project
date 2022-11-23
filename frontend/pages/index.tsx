import { useEffect, useMemo, useState } from "react";
import { Input, Button, Card, Shadow, PostButton } from "../components/index";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import {
	useSelectedContext,
	useIsAgainGetDatas,
	useUserContext,
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

type userInputType = {
	subject: string;
	school: string;
};

export default function Home() {
	const { selectedAd, setSelectedAd } = useSelectedContext();
	const [userInput, setUserInput] = useState<userInputType>({
		school: "",
		subject: "",
	});
	const { setModalText, setOpenModal } = useModalContext();
	const [ads, setAds] = useState<adsType[]>([]);
	const windowWidth = useWindowWidth();
	const [showModal, setShowModal] = useState(false);
	const { isAgainGetDatas, setIsAgainGetDatas } = useIsAgainGetDatas();
	const [page, setPage] = useState<number>(1);
	const [pagination, setPagination] = useState({ pageCount: 0 });
	const [closeDetailImage, setCloseDetailImage] = useState<Boolean | false>(
		false
	);
	useEffect(() => {
		const token = getCookie("userId");
		async function getData() {
			console.log(userInput);

			await axios({
				method: "get",
				url: `http://localhost:8000/post/?page=${page}&school=${userInput.school}&subject=${userInput.subject}`,
				headers: {
					userId: token,
				},
			})
				.then(async function (response) {
					setAds(response.data.data);
					console.log(response);
					setPagination(response.data.pagination);
				})
				.catch(function (response) {
					console.log(response);
				});
		}

		getData();
	}, [isAgainGetDatas, page]);
	//TO-DO

	const requestToDoWork = async (id: String) => {
		const token = getCookie("token");
		await axios({
			method: "post",
			data: {
				id,
			},
			url: `http://localhost:8000/post/${id}/work`,
			headers: { authorization: token },
		})
			.then(async function (response) {
				await setModalText("amjilttai");
				setOpenModal(true);
			})
			.catch(async function (error) {
				console.log(error.response.data);
				await setModalText(error.response.data.data);
				setOpenModal(true);
			});
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
	// const onclick = (el: React.MouseEvent<HTMLButtonElement>) => {
	// 	const button: HTMLButtonElement = el.currentTarget;
	// 	const id = button.value;
	// 	axios
	// 		.delete(`http://localhost:8000/post/${id}`)
	// 		.then(function (response) {});
	// };

	return (
		<div className='w-full border-#57534e border-1'>
			<DetailImage
				imageSrc={
					selectedAd &&
					`https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
				}
			/>

			<div style={{ height: "auto" }}>
				<div className='max-w-screen-xl m-auto min-h-screen flex  justify-center items-baseline relative'>
					{/* //Бүх зараа үзүүлэх хэсэг */}
					<div className='m-5 w-6/12 min-w-[330px] flex flex-col m-auto gap-10 overflow-scroll'>
						{ads.map((ad, index) => {
							return (
								<div
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
									ym={() => requestToDoWork(selectedAd.index)}
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
