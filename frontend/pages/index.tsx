import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import cn from "classnames";
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
import { IconArrow } from "../components/Icon/IconArrow";
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
  const [readMore,setReadMore] = useState(false)
  useEffect(() => {
    const userId = getCookie("userId");
    (async () => {
      if (!isLoggedIn) {
        try {
          const response = await instance.get(
            `/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
          );
          console.log(response);
          setAds(response.data.data);
          setPagination(response.data.pagination);
        } catch (error) {}
      } else {
        try {
          const response = await instance.get(
            `/post/?page=${page}&school=${userInput.school}&group=${userInput.group}&subject=${userInput.subject}`
          );
          console.log(response);
          setAds(response.data.data);
          setPagination(response.data.pagination);
        } catch (error) {
          console.error(error);
        }
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
    })();
  }, [page]);

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
          className="max-w-screen-xl flex justify-between"
          container
          gap={5}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexFlow: { xs: "column", sm: "row" },
          }}
        >
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
              }}
            >
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
                <MenuItem value={group} key={group + i}>
                  {group}
                </MenuItem>
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
              name="subject"
            >
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
            color="primary"
          >
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
            height: "auto",
            margin: "auto",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              width: { xs: "100%", md: "50%", xl: "50%" },
              alignItems: { xs: "center", md: "start" },
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {ads.map((ad, index) => {
              return (
                <Grid
                  key={index}
                  onClick={() => {
                    setSelectedAd({ ad, index });
                    setShowModal(true);
                  }}
                >
                  <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg">
                   
                    <div className="flex mb-4">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={`http://localhost:8000/users/getUserProfilePhoto/${ad.owner.photo}`}
                      />
                      <div className="ml-2 mt-0.5">
                        <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                          {ad.owner.FirstName}
                        </span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                          16 December at 08:25
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-800 0 flex justify-between dark:text-gray-100 leading-snug md:leading-normal">
                      <a
                        className={cn(
                          "inline text-code  border-b-[1px]  border-b-blue-500  text-secondary dark:text-secondary-dark px-1 rounded-md no-underline"
                        )}
                      >
                        {ad.school}
                      </a>
                      <a
                        className={cn(
                          "inline text-code  border-b-[1px]  border-b-blue-500 text-secondary dark:text-secondary-dark px-1 rounded-md no-underline"
                        )}
                      >
                        {ad.group}
                      </a>{" "}
                      <a
                        className={cn(
                          "inline text-code  border-b-[1px]  border-b-blue-500  text-secondary dark:text-secondary-dark px-1 rounded-md no-underline"
                        )}
                      >
                        {ad.subject}
                      </a>
                    </div>
                    <p className={`text-gray-800 overflow-hidden  ${!readMore?'h-[50px]':'h-[auto]'}  dark:text-gray-100 leading-snug md:leading-normal`}>
                    {readMore?ad.detail.slice(0,50):ad.detail} {readMore?<a onClick={() =>setReadMore(!readMore)} className="underline" >цааш нь унших</a>:<a onClick={() =>setReadMore(!readMore)} className="underline" >хураах</a>} 
                    </p>
                    <div className="flex justify-between items-center mt-5"></div>
                    <button
                        onClick={() => requestToDoWork(selectedAd.ad._id)}
                        type="button"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        className="px-6 py-2.5 mx-2 mb-2 rounded-xl bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Хийх
                        <IconArrow displayDirection="right" />
                      </button>
                  </div>
                
                </Grid>
              );
            })}
          </Grid>
          {/* <Grid sx={{ width: "50%" }}>
            {selectedAd && windowWidth > 950 && (
              <div className="container mx-auto my-5">
                <div className="relative rounded-lg flex flex-col items-center md:shadow-xl  mx-2">
                  <div className="z-0 order-1 relative w-full rounded h-80 ">
                    <img
                      src={`https://c0.wallpaperflare.com/preview/318/1/157/math-mathematics-assignment-work.jpg`}
                      style={{ objectFit: "fill" }}
                      className="rounded-xl absolute inset-0 w-full h-full bg-white bg-opacity-30 bg-white bg-bottom"
                    />
                    <div className="absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                      <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                        {selectedAd.ad.group}
                      </h3>
                      <h4 className="w-full text-xl text-gray-100 leading-tight">
                        {selectedAd.ad.subject}
                      </h4>
                    </div>
                  </div>

                  <div className="z-10 order-2 md:order-1 rounded-lg w-full h-full flex items-center -mt-6 md:mt-0">
                    <div className="p-8  md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg  md:rounded-lg shadow-xl md:shadow-none">
                      <p className="text-gray-600 text-justify">
                        {selectedAd.ad.detail}
                      </p>
                      <button
                        onClick={() => requestToDoWork(selectedAd.ad._id)}
                        type="button"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Хийх
                        <IconArrow displayDirection="right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Grid> */}
        </Grid>
        {/* {selectedAd && showModal && windowWidth < 950 && (
          <Backdrop sx={{ zIndex: 100 }} open={true}>
            <div className="container mx-auto my-5">
              <div className="relative rounded-lg flex flex-col items-center md:shadow-xl  mx-2">
                <div className="bg-white order-1 relative w-full rounded h-80 ">
                  <img
                    src={`https://c0.wallpaperflare.com/preview/318/1/157/math-mathematics-assignment-work.jpg`}
                    style={{ objectFit: "fill" }}
                    className="rounded-xl absolute inset-0 w-full h-full bg-white bg-opacity-30 bg-white bg-bottom"
                  />
                  <div className="absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                    <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                      {selectedAd.ad.group}
                    </h3>
                    <h4 className="w-full text-xl text-gray-100 leading-tight">
                      {selectedAd.ad.subject}
                    </h4>
                  </div>
                </div>

                <div className="z-10 order-2 md:order-1 rounded-lg w-full h-full flex items-center -mt-6 md:mt-0">
                  <div className="p-8  md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg  md:rounded-lg shadow-xl md:shadow-none">
                    <p className="text-gray-600 text-justify">
                      {selectedAd.ad.detail}
                    </p>
                    <button
                      onClick={() => requestToDoWork(selectedAd.ad._id)}
                      type="button"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                      Хийх
                      <IconArrow displayDirection="right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Backdrop>
        )} */}
      </Grid>
      <Pagination1 pagination={pagination} setPage={setPage} page={page} />
    </div>
  );
}
