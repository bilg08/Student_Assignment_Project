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
import { CleaningServices } from "@mui/icons-material";
import { log } from "console";
type adsType = {
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
    const userId = getCookie("userId");
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
        open={closeDetailImage}>
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
              }}>
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
          <Backdrop sx={{ zIndex: 100 }} open={true}>
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
}
