import { useEffect, useMemo, useState } from "react";
import { Input, Button, Card, Shadow } from "../components/index";
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
  subject: String | "subject";
  school: String | "school";
};

export default function Home() {
  const { selectedAd, setSelectedAd } = useSelectedContext();
  const [userInput, setUserInput] = useState<userInputType | object>({
    school: "",
    subject: "",
  });
  const { setModalText, setOpenModal } = useModalContext();
  const [ads, setAds] = useState<adsType[]>([]);
  const windowWidth = useWindowWidth();
  const [showModal, setShowModal] = useState(false);
  const { isAgainGetDatas } = useIsAgainGetDatas();
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState({ pageCount: 0 });
  const [closeDetailImage, setCloseDetailImage] = useState<Boolean | false>(
    false
  );
  useEffect(() => {
    const token = getCookie("userId");
    async function getData() {
      await axios({
        method: "get",
        url: `http://localhost:8000/post/?page=${page}`,
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
  }, [isAgainGetDatas,page]);
  //TO-DO
  const handleSearch = () => {};

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
        className="w-[100%] h-[150vh] bg-grey/3 backdrop-blur-xl absolute z-30"
      >
        <button
          onClick={() => setCloseDetailImage(false)}
          className="absolute p-5 bg-red-500 rounded"
        >
          X
        </button>
        <div className="w-[100%] h-[auto]">
          <img
            style={{ margin: `auto`, width: `auto`, height: "auto" }}
            src={selectedAd && props.imageSrc}
          />
        </div>
      </div>
    );
  };
  const onclick = (el: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = el.currentTarget;
    const id = button.value;
    axios
      .delete(`http://localhost:8000/post/${id}`)
      .then(function (response) {});
  };

  return (
    <div className="w-full border-#57534e border-1">
      <DetailImage
        imageSrc={
          selectedAd &&
          `https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
        }
      />
      <div className="flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5">
        <Input
          placeholder="Сургууль"
          onchange={setUserInput}
          userInput={userInput}
          icon={<AiOutlineSearch />}
          name="school"
        />
        <Input
          placeholder="Хичээл"
          onchange={setUserInput}
          userInput={userInput}
          name="subject"
          icon={<MdLocationOn />}
        />
        <Button onClick={handleSearch}>Хайх</Button>
      </div>

      <div style={{ height: "auto" }}>
        <div className="max-w-screen-xl m-auto min-h-screen flex  justify-center items-start relative">
          {/* //Бүх зараа үзүүлэх хэсэг */}
          <div className="m-5 w-6/12 min-w-[330px] flex flex-col m-auto gap-10 overflow-scroll">
            {ads.map((ad, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedAd({ ad, index });
                    setShowModal(true);
                  }}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg"
                      src="https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {ad.advertisingHeader}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {ad.detail}
                    </p>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          {/* ************************************************************************************** */}

          {/* Jijig delgetsen deer haragdah  zarnii delgerengui  */}

          {selectedAd && showModal && windowWidth < 935 && (
            <Shadow>
              <div className="min-w-[330px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    onClick={() => setCloseDetailImage(true)}
                    className="rounded-t-lg"
                    src="https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {selectedAd.ad.advertisingHeader}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                  {/* 
				eniig component
				*/}
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Хийх
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  {/* 
				
				*/}
                  <a
                    onClick={() => setShowModal(false)}
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Гарах
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  {/* 
				
				*/}
                </div>
              </div>
            </Shadow>
          )}
          {/* ************************************************************************************************ */}

          {/* Tom delgetsen deer haragdah  zarnii delgerengui  */}
          {selectedAd && windowWidth > 935 && (
            // 	<div
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  onClick={() => setCloseDetailImage(true)}
                  className="rounded-t-lg"
                  src="https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {selectedAd.ad.advertisingHeader}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Хийх
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* ************************************************************************************************ */}
        </div>
        <Pagination pagination={pagination} setPage={setPage} page={page} />
      </div>
    </div>
  );
}
