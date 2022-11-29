import { useEffect, useState } from "react";
import React from "react";
import { MyImage } from "../index";
import { useIsAgainGetDatas, useLoaderContext } from "../../context";
import { instance } from "../../components/Layout";
export interface PostModalProps {
	cActive: any;
	setCactive: any;
}

export const PostModal: React.FC<PostModalProps> = ({ setCactive }) => {
	const [fileSelected, setFileSelected] = useState<any | null>([]);
	const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
	const [school, setSchool] = useState("");
	const { setIsAgainGetDatas } = useIsAgainGetDatas();
	const [schoolLessons, setSchoolLessons] = useState([]);
	const [schools, setSchools] = useState<any>([]);
	const [schoolGroup, setSchoolGroup] = useState<any>([]);
	const [subject, setSubject] = useState("");
	const [group, setGroup] = useState("");
	const { setOpenshadow } = useLoaderContext();
	useEffect(() => {
		const getData = async () =>
			await instance
				.get("/school")
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
			if (school1.name === school) {
				school1.groupAndThatGrouplessons.map((group: any) =>
					setSchoolGroup((prev: any) => [...prev, group.GroupName])
				);
			}
		});
	}, [school, group]);
	useEffect(() => {
		schools.map((school1: any) => {
			if (school1.name === school) {
				school1.groupAndThatGrouplessons.map((group1: any) => {
					if (group1.GroupName === group) {
						setSchoolLessons(group1.course);
					}
				});
			}
		});
	}, [group]);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formDatas = new FormData();
		formDatas.append("advertisingHeader", event.currentTarget.first.value);
		formDatas.append("detail", event.currentTarget.second.value);
		formDatas.append("price", event.currentTarget.third.value);
		formDatas.append("group", group);
		formDatas.append("school", school);
		formDatas.append("subject", subject);
		formDatas.append("file", fileSelected);
		await instance
			.post("/post", formDatas)
			.then(async function (response) {
				await setCactive(false);
				alert("Зар амжилттай тавигдлаа");
				setIsAgainGetDatas((e: any) => !e);
				setOpenshadow(false);
			})
			.catch(function (response) {
				const error = response.response.data.error.split(",");
				error.map((el: string) => alert(el));
			});
	};

	const uploadFile = function (e: any) {
		if (e.target.files && e.target.files[0]) {
			const i = e.target.files[0];
			setFileSelected(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};

	return (
		<form
			className='w-full sm:w-3/4 md:w-2/4 z-30 lg:w-auto h-auto absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-3xl backdrop-blur-md bg-gradient-to-r from-purple-300 to-violet-200 '
			onSubmit={handleSubmit}>
			<div className='flex justify-between '>
				<button
					onClick={() => {
						setCactive(false);
						setOpenshadow(false);
					}}
					type='button'
					className=' text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center '
					data-modal-toggle='authentication-modal'>
					<svg
						aria-hidden='true'
						className='w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clipRule='evenodd'></path>
					</svg>
					<span className='sr-only'>Close</span>
				</button>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full 2 px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center mt-6'>
						Зарын нэр
					</label>
					<input
						className='block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
						id='grid-first-name'
						type='text'
						placeholder='Title'
						name='first'></input>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center'>
						Дэлгэрэнгүй
					</label>
					<input
						className='appearance-none block w-full h-auto bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3  focus:outline-none focus:bg-white '
						type='text'
						placeholder='...'
						name='second'></input>
				</div>
			</div>
			<div className='w-full  mb-6 md:mb-0'>
				<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
					Сургууль
				</label>
				<div className='relative'>
					<select
						className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						name='fourth'
						onChange={async (e) => {
							await setSchool(e.target.value);
						}}>
						<option></option>
						{schools.map((school: { name: "" }, i: number) => (
							<option
								value={school.name}
								key={school.name + i}>
								{school.name}
							</option>
						))}
					</select>
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
						<svg
							className='fill-current h-4 w-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'>
							<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
						</svg>
					</div>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-2'>
				<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Төлбөр
					</label>
					<input
						className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						type='text'
						placeholder='deal'
						name='third'></input>
				</div>
				<div className='w-full md:w-2/3 px-3 mb-6 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Бүлэг
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-state'
							onChange={(e) => setGroup(e.target.value)}
							name='fourth'>
							<option></option>
							{schoolGroup?.map((group: string) => (
								<option>{group}</option>
							))}
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2'>
						Хичээл
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-state'
							onChange={(e) => {
								setSubject(e.target.value);
							}}
							name='fourth'>
							<option></option>
							{schoolLessons?.map((schoolLesson: any, i: number) => {
								return (
									<option key={schoolLesson + i}>{schoolLesson.subject}</option>
								);
							})}
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>
			</div>
			<MyImage src={createObjectURL} />

			<div className='flex justify-center items-center w-full '>
				<input
					className='block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none  '
					id='small_size'
					type='file'
					onChange={uploadFile}></input>
			</div>

			<button
				type='submit'
				className='w-auto h-[20px] text-gray-500 '>
				Илгээх
			</button>
		</form>
	);
};
