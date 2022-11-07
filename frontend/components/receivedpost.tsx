import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import { ProfileCard, Button } from "../components/index";
import data from "../data/advertisings.json";
import { useState } from "react";

export const ReceivedPosts = () => {
  const buttonArr = [
    { textValue: "Chat", style: "purple-300" },
    { textValue: "Submit", style: "green-300" },
    { textValue: "Cancel", style: "red-300" },
  ];
  const postedButtonArr = [
    { textValue: "Chat", style: "purple-300" },
    { textValue: "Edit", style: "red-300" },
    { textValue: "Delete", style: "grey-300" },
  ];
  const [chosen, setChosen] = useState(true);
  return (
    <div className="flex-col items-center lg:w-4/6 md:w-full xs:w-full  m-auto ml-14 overflow-auto h-screen  overscroll-y-none">
      <div className=" h-[50px]  pr-2 z-10 bg-white flex justify-between items-end">
        <h1 className="text-4xl text-center mt-4">
          {chosen ? "Миний зар" : "Хүлээн авсан зар"}
        </h1>
        <Button onClick={() => setChosen(!chosen)}>
          {chosen ? "Хүлээн авсан зар" : "Миний зар"}
        </Button>
      </div>
      {chosen ? (
        <div className="overscroll-y-none  flex-col flex items-center pb-[100px]">
          {data.map((el, ind) => {
            return (
              <ProfileCard key={ind}>
                <PostReceived
                  name={el.advertisingHeader}
                  owner={el.owner.name}
                  description={el.detail}
                />
                <div>
                  {postedButtonArr?.map((el, index): any => (
                    <PostButton
                      key={index}
                      data={el.textValue}
                      prop={el.style}
                    />
                  ))}
                </div>
              </ProfileCard>
            );
          })}
        </div>
      ) : (
        <div className="overscroll-y-none  flex-col flex items-center pb-[100px]">
          {data.map((el, ind) => {
            return (
              <ProfileCard key={ind}>
                <PostReceived
                  name={el.advertisingHeader}
                  owner={el.owner.name}
                  description={el.detail}
                />
                <div>
                  {buttonArr?.map((el, index): any => (
                    <PostButton
                      key={index}
                      data={el.textValue}
                      prop={el.style}
                    />
                  ))}
                </div>
              </ProfileCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
