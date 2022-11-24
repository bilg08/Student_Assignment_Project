import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import {
	useIsAgainGetDatas,
	useIsUserLoggedContext,
	usePostStateContext,
	useSearchContext,
} from "../context";
import { useWindowWidth } from "../hooks";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Input, Button } from "./index";
import axios from "axios";
type userInputType = {
	subject: string;
	school: string;
};
export const Header = () => {
	const [fileSelected, setFileSelected] = useState<any | null>([]);
  const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
  const [school, setSchool] = useState("");
  const { setIsAgainGetDatas } = useIsAgainGetDatas();
  const [schoolLessons, setSchoolLessons] = useState([]);
  const [schools, setSchools] = useState<any>([]);
  const [schoolGroup, setSchoolGroup] = useState<any>([]);
  const [subject, setSubject] = useState("");
	const [group, setGroup] = useState("");
		const router = useRouter();
    const windowWidth = useWindowWidth();
    const { isLoggedIn } = useIsUserLoggedContext();
    const { receivedPost, setReceivedPost } = usePostStateContext();
    const { userinput, setUserinput } = useSearchContext();
    const handleSearch = () => {
      console.log(userinput);
      setIsAgainGetDatas((e: boolean) => !e);
    };

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

	return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              React
            </span>
          </div>
          <div>
            {router.pathname === "/" ? (
              <div className="flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="fourth"
                  onChange={async (e) => {
                    await setSchool(e.target.value);
                  }}>
                  {schools.map((school: { name: "" }, i: number) => (
                    <option value={school.name} key={school.name + i}>
                      {school.name}
                    </option>
                  ))}
                </select>
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setGroup(e.target.value)}
                  name="fourth">
                  {schoolGroup?.map((group: string) => (
                    <option>{group}</option>
                  ))}
                </select>
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  name="fourth">
                  {schoolLessons?.map((schoolLesson: any, i: number) => {
                    return (
                      <option key={schoolLesson + i}>
                        {schoolLesson.subject}
                      </option>
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
            ) : windowWidth >= 950 ? (
              <div className=" h-[50px] w-[35vw]  pr-2 z-10 bg-white flex justify-evenly items-end">
                <h1
                  className={`${
                    windowWidth <= 1300 ? "text-[2.4vw]" : "text-[1.4vw]"
                  } text-center mt-4`}>
                  {receivedPost ? "Миний зар" : "Хүлээн авсан зар"}
                </h1>
                <Button onClick={() => setReceivedPost(!receivedPost)}>
                  {receivedPost ? "Хүлээн авсан зар →" : "Миний зар →"}
                </Button>
              </div>
            ) : (
              <Button onClick={() => setReceivedPost(!receivedPost)}>
                {receivedPost ? "Хүлээн авсан зар →" : "Миний зар →"}
              </Button>
            )}
          </div>
          <div className="flex items-center lg:order-2">
            <div
              style={{ display: isLoggedIn ? "none" : "block" }}
              onClick={() => router.push("loginPage")}
              className="z-10 text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">
              Нэвтрэх/Бүртгүүлэх
            </div>
            <div
              style={{ display: isLoggedIn ? "block" : "none" }}
              onClick={() => router.push("profile")}
              className="z-10 text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">
              Миний хэсэг
            </div>
          </div>
        </div>
      </nav>
    </header>
  );

};
