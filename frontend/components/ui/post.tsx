import axios from "axios";
import { UserProfileBox } from "../chat/userProfile";
import { PostButton } from "./postButton";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key, MouseEventHandler } from "react";

export interface PostListProps {
  data?: any;
}

export const Post: React.FC<PostListProps> = ({ data }) => {

  const postedButtonArr = [
    {
      textValue: "Edit",
      style: "#C4FAF8",
      function: () => {},
    },
    {
      textValue: "Delete",
      style: "#FFABAB",
      function: (el: React.MouseEvent<HTMLButtonElement>) => {
        const button: HTMLButtonElement = el.currentTarget;
        const id = button.value;
        axios
          .delete(`http://localhost:8000/post/${id}`)
          .then(function (response) {
          });
      },
    },
  ];

  return (
    <div>
      {data.map((e: any, i: any) => {
        return (
          <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto mt-[10px] max-w-md md:max-w-2xl ">
            <div className="flex items-start px-4 py-6">
              <div className="flex-col justify-center items-center m-auto">
                <div className="flex items-center justify-between p-[2px]">
                  <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                    {e.advertisingHeader}
                  </h2>
                </div>
                <img
                  src={`http://localhost:8000/post/photo/${e.photo}`}
                  className="flex items-center justify-center"
                />
                <p className="mt-3 text-gray-700 text-sm">{e.detail}</p>
                <div className="mt-4 flex items-center">
                  <div className="flex mr-2 text-gray-700 text-sm mr-3">
                    <p>₮</p>
                    <span>{e.price}</span>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap">
                      {postedButtonArr?.map((el: { textValue: string | undefined; style: string | undefined; function: MouseEventHandler<HTMLButtonElement> | undefined; }, index: Key | null | undefined): any => (
                        <PostButton
                          key={index}
                          data={el.textValue}
                          prop={el.style}
                          ym={el.function}
                        />
                      ))}
                    </div>
                <div>
                      <h1>Хийх хүсэлтүүд:</h1>
                      {e.pendingRequest.map((request: any) => {
                        return (
                          <div className=" h-fit lg:w-full md:w-5/6 xs:w-[80%] border border-black rounded-lg flex flex-col p-2">
                            <UserProfileBox request={request} />
                          </div>
                        );
                      })}
                      {e.worker.id && (
                        <div className="bg-yellow-300 flex flex-col">
                          <h1>Хийх хүн</h1>
    
                          <div className="flex items-center justify-around">
                            {e.worker.email}{" "}
                            <PostButton data={"Харилцах"} prop={"rgb(225 29 72)"} />
                          </div>
                        </div>
                      )}
                    </div>
              </div>
           
            </div>
          </div>
        );
      })}
    </div>
  );
};
