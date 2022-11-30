import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { Shadow, PostButton, Button } from "../components/index";
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
    setShowModal(false)
    setSelectedAd(null)
    setIsAgainGetDatas((e: boolean) => !e);

  };
  const DetailImage = (props: { imageSrc: string }) => {
    return (
      <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,display:'flex',justifyContent:'center',alignItems:'center'}}
  
  open={closeDetailImage}
>

        <Button
          onClick={() => setCloseDetailImage(false)}
          variant="contained"
        >
          X
        </Button>
        <Grid className="w-[100%] h-[auto] justify-self-center">
          <img
            style={{
              margin: `auto`,
              width: "80%",
              height: "auto",
              marginTop: "3vw",
            }}
            src={selectedAd && 'https://images.pexels.com/photos/325946/pexels-photo-325946.jpeg?cs=srgb&dl=pexels-pixabay-325946.jpg&fm=jpg'}
          />
        </Grid>
</Backdrop>
      
    );
  };

  return (
    <div className="w-full border-#57534e border-1">
      <div className="flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5">
        <FormControl fullWidth>
          <InputLabel  id="demo-simple-select-label">Сургууль</InputLabel>
          <Select
            name="school"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInput.school}
            label="Сургууль"
            onChange={async (e) => {
              await setUserInput({
                ...userInput,
                [e.target.name]: e.target.value,
              });
            }}
          >
            {schools.map((school: { name: "" }, i: number) => (
              <MenuItem  value={school.name} key={school.name + i}>
                {school.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Бүлэг</InputLabel>
          <Select

            name="group"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInput.group}
            label="group"
            onChange={async (e) => {
              await setUserInput({
                ...userInput,
                [e.target.name]: e.target.value,
              });
            }}
          >
            {schoolGroup?.map((group: string, i: string) => (
              <MenuItem value={group} key={group + i}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Хичээл</InputLabel>
          <Select

            name="subject"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInput.subject}
            label="group"
            onChange={async (e) => {
              await setUserInput({
                ...userInput,
                [e.target.name]: e.target.value,
              });
            }}
          >
            {schoolLessons?.map((schoolLesson: any, i: number) => {
              return (
                <MenuItem value={schoolLesson.subject} key={schoolLesson + i}>
                  {schoolLesson.subject}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button onClick={handleSearch} variant="outlined">
          Хайх
        </Button>
      </div>
      <DetailImage imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzMNWNPsA8KiUFY_YiEC7rub3JEDOCUXXHwJ40dp7&s"/>
      <Grid
        container
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1350px",
          margin: "auto",
          minHeight: "auto",
        }}
      >
        <Grid item sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
          {ads.map((ad, index) => {
            return (
              <Grid
                key={index}
                onClick={() => {
                  setSelectedAd({ ad, index });
                  setShowModal(true);
                }}
                className="max-w-sm bg-white border rounded-lg shadow-md"
              >
                <CardMedia
                onClick={()=> setCloseDetailImage(true)}
                  component="img"
                  height="140"
                  sx={{ borderRadius: "10px" }}
                  image={`https://images.pexels.com/photos/325946/pexels-photo-325946.jpeg?cs=srgb&dl=pexels-pixabay-325946.jpg&fm=jpg`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ad.advertisingHeader}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ad.detail}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    onClick={() => handleSearch()}
                    size="small"
                    color="primary"
                  >
                    Дэлгэрэнгүй
                  </Button>
                </CardActions>
              </Grid>
            );
          })}
        </Grid>
        <Grid>
          {selectedAd && windowWidth > 935 && (
            <Grid className="max-w-lg bg-white border rounded-lg shadow-md">
              <CardMedia
              onClick={()=> setCloseDetailImage(true)}
                component="img"
                height="140"
                sx={{ borderRadius: "10px" }}
                image={`https://images.pexels.com/photos/325946/pexels-photo-325946.jpeg?cs=srgb&dl=pexels-pixabay-325946.jpg&fm=jpg`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedAd.ad.advertisingHeader}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedAd.ad.detail}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => requestToDoWork(selectedAd.ad._id)}
                  color="primary"

                >
                  Хийх
                </Button>
              </CardActions>
            </Grid>
          )}
        </Grid>
        {selectedAd && showModal && windowWidth < 935 && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <Grid className="max-w-xl bg-white min-w-[330px] border  rounded-lg shadow-md">
              <CardMedia
              onClick={()=> setCloseDetailImage(true)}

                component="img"
                height="140"
                sx={{ borderRadius: "10px" }}
                image={`https://images.pexels.com/photos/325946/pexels-photo-325946.jpeg?cs=srgb&dl=pexels-pixabay-325946.jpg&fm=jpg`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedAd.ad.advertisingHeader}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedAd.ad.detail}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => requestToDoWork(selectedAd.ad._id)}
                >
                  Хийх
                </Button>
                <Button
                  onClick={() =>{setSelectedAd("");setCloseDetailImage(false)}}
                >
                  Гарах
                </Button>
              </CardActions>
            </Grid>
          </Backdrop>
        )}
      </Grid>
  

      <Pagination1 pagination={pagination} setPage={setPage} page={page} /> 
    </div>
  );
}
