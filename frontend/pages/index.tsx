import { useEffect, useMemo, useState } from "react";
import {
  Input,
  Button,
  Card,
  Shadow,
} from "../components/index";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

import { useSelectedContext } from "../context/index";
import { useWindowWidth } from "../hooks/index";
import axios from "axios";
import { useIsAgainGetDatas } from "../context/againGetAllDatas";
import { getCookie } from "cookies-next";
type adsType = {
  _id: string | number | readonly string[] | undefined;
  advertisingHeader: String;
  detail: String;
  owner: {
    name: String;
    image: String | any;
  };
  createdAt: String;
  photo?: any;
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
  const [ads, setAds] = useState<adsType[]>([]);
  const windowWidth = useWindowWidth();
  const [showModal, setShowModal] = useState(false);
  const { isAgainGetDatas } = useIsAgainGetDatas();
  useEffect(() => {
    async function getData() {
      try {
        const datas = await axios.get("https://backend-leap2-production.up.railway.app/post");
        setAds(datas.data.data);
      } catch (error) {}
    }
    getData();
  }, [isAgainGetDatas]);
  //TO-DO
  const handleSearch = () => {
  };
  

  const requestToDoWork = async (id: String) => {
    const token = getCookie("token");
     await axios({
        method: "post",
        data:{
          id
        },
        url: `https://backend-leap2-production.up.railway.app/post/${id}/work`,
        headers: {"authorization":getCookie('token')
      },
      })
       .then(function (response) {
        })
       .catch(function (response) {
        });
    
  };

  const onclick = (el: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = el.currentTarget;
    const id = button.value;
    axios.delete(`https://backend-leap2-production.up.railway.app/post/${id}`).then(function (response) {
    });
  };
  const memoizedCard = useMemo(() => {}, []);

  return (
    <div className="w-full border-#57534e border-1">
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

      <div style={{ backgroundColor: `#f6f5f4`, height: "auto" }}>
        <div className="max-w-screen-xl m-auto min-h-screen flex  justify-center items-start relative">
          {/* //Бүх зараа үзүүлэх хэсэг */}
          <div className="m-5 w-6/12 min-w-[500px] flex flex-col m-auto gap-10 overflow-scroll">
            {ads.map((ad, index) => {
              return (
                <Card index={index} key={index}>
                  <div className="w-full max-w-sm   rounded-lg border border-gray-200 shadow-md ">
                    <div className="flex justify-end px-4 pt-4">
                      <button
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className="w-10 h-10  inline-block text-gray-500 hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
                        type="button"
                      >
                        <svg
                          className="w-6 h-6"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col items-center pb-10">
                      <div
                        onClick={() => {
                          setSelectedAd({ ad, index });
                          setShowModal(true);
                        }}
                      >
                        <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                          {ad.advertisingHeader}
                        </h5>
                        <p className="text-md">{ad.detail}</p>
                        <div className="flex">
                          <img
                            style={{ width: `40px`, height: `40px` }}
                            src={`https://backend-leap2-production.up.railway.app/post/photo/${ad.photo}`}
                          />
                          <p className="text-gray-500">
                            Зар тавигдсан хугацаа:{ad.createdAt}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onclick}
                        value={ad._id}
                        className="border-[#000] border-[2px] mt-2"
                      >
                        {" "}
                        Hasah(tur zuur hiigeed orhichii){" "}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {/* ************************************************************************************** */}

          {/* Jijig delgetsen deer haragdah  zarnii delgerengui  */}

          {selectedAd && showModal && windowWidth < 935 && (
            <Shadow>
              <div>
                <Card>
                  <Card>
                    <div className="relative">
                      <h1 className="text-4xl  font-bold">
                        {selectedAd.ad.advertisingHeader}
                      </h1>
                      <h3 className="text-2xl font-bold color-silver">
                        Захиалагч:Билгүүн
                      </h3>
                      <p className="text-gray-500">
                        Зар тавигдсан хугацаа:{selectedAd.ad.createdAt}
                      </p>
                      <Button
                        onClick={() => requestToDoWork(selectedAd.ad._id)}
                      >
                        Хийх
                      </Button>
                      <button
                        onClick={() => setShowModal(false)}
                        style={{ position: "absolute", top: 0, right: 0 }}
                      >
                        X
                      </button>
                    </div>
                  </Card>
                  <Card>
                    <p>{selectedAd.ad.detail}</p>
                  </Card>
                </Card>
              </div>
            </Shadow>
          )}
          {/* ************************************************************************************************ */}

          {/* Tom delgetsen deer haragdah  zarnii delgerengui  */}
          {selectedAd && windowWidth > 935 && (
            <div className={"w-6/12"}>
              <div className="absolute">
                <Card>
                  <Card>
                    <h1 className="text-4xl  font-bold">
                      {selectedAd.ad.advertisingHeader}
                    </h1>
                    <h3 className="text-2xl font-bold color-silver">
                      Захиалагч:Билгүүн
                    </h3>
                    <p className="text-gray-500">
                      Зар тавигдсан хугацаа:{selectedAd.ad.createdAt}
                    </p>
                    <Button>Хийх</Button>
                  </Card>
                  <Card>
                    <p>{selectedAd.ad.detail}</p>
                  </Card>
                </Card>
              </div>
            </div>
          )}

          {/* ************************************************************************************************ */}
        </div>
      </div>
    </div>
  );
}
