import { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { Note } from "../components/SomeCart";
import {

  useSelectedContext,
  useIsAgainGetDatas,
  useSearchContext,
  useLoaderContext,
  useIsUserLoggedContext,
} from "../context/index";
import { useWindowWidth } from "../hooks/index";
import { useModalContext } from "../context/index";
import { Pagination1 } from "../components/pagination";
import { instance } from "../components/Layout";
import { getCookie } from "cookies-next";
import { MenuItem, Select } from "@mui/material";
type adsType = {
<<<<<<< HEAD
	_id: string | number | readonly string[] | undefined;
	advertisingHeader: String;
	detail: String;
	owner: {
		name: String;
		image: String | any;
	};
	isDone: boolean;
	createdAt: String;
	photo?: string;
	price?: string;
};

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
	const { setOpenshadow } = useLoaderContext();
	const { isLoggedIn } = useIsUserLoggedContext();
	useEffect(() => {
		async function getData() {
			const userId = getCookie("userId");
			if (!isLoggedIn) {
				await instance
					.get(
						`/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
					)
					.then(async function (response) {
						setAds(response.data.data);
						setPagination(response.data.pagination);
					})
					.catch(function (response) {});
			} else {
				await instance
					.get(
						`/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
					)
					.then(async function (response) {
						const postNotIncludedUser = response.data.data.filter(
							(post: { owner: string }) => post.owner !== userId
						);
						setAds(postNotIncludedUser);
						setPagination(response.data.pagination);
					})
					.catch(function (response) {});
			}

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
		}

		getData();
		return () => {
			getData();
		};
	}, [isAgainGetDatas, page, isLoggedIn]);
=======
  _id: string | number | readonly string[] | undefined;
  advertisingHeader: String;
  detail: String;
  owner: {
    name: String;
    image: String | any;
  };
  isDone: boolean;
  createdAt: String;
  photo?: string;
  price?: string;
};

export default function Home() {
  const { selectedAd, setSelectedAd } = useSelectedContext();
  const { setModalText, setOpenModal,setType } = useModalContext();
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
  const { setOpenshadow } = useLoaderContext();
  const { isLoggedIn } = useIsUserLoggedContext();

  useEffect(() => {
    async function getData() {
      const userId = getCookie("userId");
      if (!isLoggedIn) {
        await instance
          .get(
            `/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
          )
          .then(async function (response) {
            setAds(response.data.data);
            setPagination(response.data.pagination);
          })
          .catch(function (response) {});
      } else {
        await instance
          .get(
            `/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
          )
          .then(async function (response) {
            const postNotIncludedUser = response.data.data.filter(
              (post: { owner: string }) => post.owner !== userId
            );
            setAds(postNotIncludedUser);
            setPagination(response.data.pagination);
          })
          .catch(function (response) {});
      }

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
    }
>>>>>>> homePageMui

    getData();
    return () => {
      getData();
    };
  }, [isAgainGetDatas, page, isLoggedIn]);

<<<<<<< HEAD
	return (
		<div className='w-full border-#57534e border-1'>
			<DetailImage
				imageSrc={
					selectedAd &&
					`http://localhost:8000/post/photo/${selectedAd.ad.photo}`
				}
			/>
			<div>
				<div className='flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5'>
					<select
						className='block w-full bg-white border border-dark-purple text-dark-purple py-3 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						name='school'
						onChange={async (e) => {
							await setUserInput({
								...userInput,
								[e.target.name]: e.target.value,
							});
						}}>
						<option value=''>Сургууль</option>
						{schools.map((school: { name: "" }, i: number) => (
							<option
								value={school.name}
								key={school.name + i}>
								{school.name}
							</option>
						))}
					</select>
					<select
						className='block w-full bg-white border border-dark-purple text-dark-purple py-3 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						onChange={async (e) => {
							await setUserInput({
								...userInput,
								[e.target.name]: e.target.value,
							});
						}}
						name='group'>
						<option value=''>Бүлэг</option>
						{schoolGroup?.map((group: string, i: string) => (
							<option key={group + i}>{group}</option>
						))}
					</select>
					<select
						className='block w-full bg-white border border-dark-purple text-dark-purple py-3 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-state'
						onChange={async (e) => {
							await setUserInput({
								...userInput,
								[e.target.name]: e.target.value,
							});
						}}
						name='subject'>
						<option value=''>Хичээл</option>
						{schoolLessons?.map((schoolLesson: any, i: number) => {
							return (
								<option key={schoolLesson + i}>{schoolLesson.subject}</option>
							);
						})}
					</select>
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
										src={`http://localhost:8000/post/photo/${selectedAd?.ad.photo}`}
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
									src={`http://localhost:8000/post/photo/${selectedAd.ad.photo}`}
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
											ym={() => requestToDoWork(selectedAd.ad._id)}
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
								src={`http://localhost:8000/post/photo/${selectedAd.ad.photo}`}
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
=======
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
  const requestToDoWork = async (id: String) => {
    await instance
      .post(`/post/${id}/work`)
      .then(async function (response) {
        setOpenshadow(true);
        await setModalText("amjilttai");
        setOpenModal(true);
      })
      .catch(async function (error) {
        setOpenshadow(true);
        setType("error");
        await setModalText(error.response.data.data);
        setOpenModal(true);
      });
  };
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
        open={closeDetailImage}
      >
        <Button onClick={() => setCloseDetailImage(false)} variant="contained">
          X
        </Button>
        <Grid className="w-[100%] h-[auto] flex justify-center">
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
    <div className="w-full border-#57534e border-1">
      <Grid className="flex h-auto  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5">
        <Grid
          container
          gap={5}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexFlow: { xs: "column", sm: "row" },
          }}>
          <Grid md={3} className="w-5/6" item>
            <InputLabel className="font-bold" id="demo-simple-select-label">
              Сургууль
            </InputLabel>
            <Select
              className="bg-[#ebecf0] my-2 md:flex relative pl-4 pr-0.5 py- h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full  text-gray-30 rounded-lg align-middle text-sm"
              name="school"
              value={userInput.school}
              onChange={async (e) => {
                await setUserInput({
                  ...userInput,
                  [e.target.name]: e.target.value,
                });
              }}>
              {schools.map((school: { name: "" }, i: number) => (
                <MenuItem value={school.name} key={school.name + i}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid md={3} className="w-5/6 " item>
            <InputLabel className="font-bold" id="demo-simple-select-label">
              Бүлэг
            </InputLabel>
            <Select
              className="bg-[#ebecf0] my-2 md:flex relative pl-4 pr-0.5 py-1 h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full text-gray-30 rounded-lg align-middle text-sm"
              id="grid-state"
              name="group"
              value={userInput.group}
              onChange={async (e) => {
                await setUserInput({
                  ...userInput,
                  [e.target.name]: e.target.value,
                });
              }}
              >
              <MenuItem value="">Бүлэг</MenuItem>
              {schoolGroup?.map((group: string, i: string) => (
                <MenuItem value={group} key={group + i}>{group}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid md={3} className="w-5/6" item>
            <InputLabel className="font-bold" id="demo-simple-select-label">
              Хичээл
            </InputLabel>
            <Select
              className="bg-[#ebecf0] my-2 md:flex relative pl-4 pr-0.5 py-1 h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full text-gray-30 rounded-lg align-middle text-sm"
              id="grid-state"
              onChange={async (e) => {
                await setUserInput({
                  ...userInput,
                  [e.target.name]: e.target.value,
                });
              }}
              name="subject">
              <MenuItem value="">Хичээл</MenuItem>
              {schoolLessons?.map((schoolLesson: any, i: number) => {
                return (
                  <MenuItem value={schoolLesson.subject} key={schoolLesson + i}>
                    {schoolLesson.subject}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <button
            style={{ padding: "6px 15px", marginTop: "20px" }}
            className="bg-indigo-600 text-white rounded-lg"
            onClick={handleSearch}
            color="primary">
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
            justifyContent: "space-between",
            maxWidth: "1300px",
            margin: "auto",
            height: "auto",
          }}>
          <Grid
            item
            sx={{
              display: "flex",
              width: { xs: "100%", md: "50%", xl: "50%" },
              alignItems: { xs: "center", md: "start" },
              flexDirection: "column",
              gap: "20px",
            }}>
            {ads.map((ad, index) => {
              return (
                <Grid
                  key={index}
                  onClick={() => {
                    setSelectedAd({ ad, index });
                    setShowModal(true);
                  }}
                  className=" bg-indigo-100 pt-8 pb-4 px-5 shadow-indigo-300/50 shadow-xl sm:px-8 my-8 w-5/6 relative rounded-none shadow-inner -mx-5 sm:mx-auto sm:rounded-lg flex-wrap">
                  <CardContent>
                    <Typography
                      gutterBottom
                      className="font-bold"
                      variant="h5"
                      component="div">
                      {ad.advertisingHeader}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="font-bold"
                      color="text.secondary">
                      {ad.detail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleSearch()}
                      size="small"
                      style={{ padding: "6px 16px" }}
                      className="bg-sky-500 text-white">
                      Дэлгэрэнгүй
                    </Button>
                  </CardActions>
                </Grid>
              );
            })}
          </Grid>
          <Grid sx={{ width: "50%" }}>
            {selectedAd && windowWidth > 900 && (
              <Note>
                <CardMedia
                  onClick={() => setCloseDetailImage(true)}
                  component="img"
                  height="140"
                  sx={{ borderRadius: "10px" }}
                  image={`http://localhost:8000/post/photo/${selectedAd.ad.photo}`}
                />
                <CardContent>
                  <Typography
                    className="text-indigo-500 font-bold"
                    gutterBottom
                    variant="h5"
                    component="div">
                    {selectedAd.ad.advertisingHeader}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-xl font-bold"
                    color="text.secondary">
                    {selectedAd.ad.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ padding: "6px 15px" }}
                    className="bg-indigo-600 text-white rounded-lg"
                    onClick={() => requestToDoWork(selectedAd.ad._id)}
                    color="primary">
                    Хийх
                  </Button>
                </CardActions>
              </Note>
            )}
          </Grid>
        </Grid>
        {selectedAd && showModal && windowWidth < 900 && (
          <Backdrop
            sx={{zIndex:100}}
            open={true}>
            <div style={{ width: "80%" }}>
              <Note>
                <CardMedia
                  onClick={() => setCloseDetailImage(true)}
                  component="img"
                  height="140"
                  sx={{ borderRadius: "10px" }}
                  image={`http://localhost:8000/post/photo/${selectedAd.ad.photo}`}
                />
                <CardContent>
                  <Typography
                    className="text-indigo-500 font-bold"
                    gutterBottom
                    variant="h5"
                    component="div">
                    {selectedAd.ad.advertisingHeader}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-xl font-bold"
                    color="text.secondary">
                    {selectedAd.ad.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ padding: "6px 15px" }}
                    className="bg-indigo-600 text-white rounded-lg"
                    onClick={() => requestToDoWork(selectedAd.ad._id)}
                    color="primary">
                    Хийх
                  </Button>
                  <Button
                    sx={{ padding: "6px 15px" }}
                    className="bg-indigo-600 text-white rounded-lg"
                    onClick={() => setShowModal(false)}
                    color="primary">
                    Гарах
                  </Button>
                </CardActions>
              </Note>
            </div>
          </Backdrop>
        )}
      </Grid>
      <Pagination1 pagination={pagination} setPage={setPage} page={page} />
    </div>
  );
>>>>>>> homePageMui
}
