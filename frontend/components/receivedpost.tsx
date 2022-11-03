import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import data from "../data/advertisings.json";
import { Card } from "./Card";

export const ReceivedPosts = () => {
  return (
    <div className="flex-col items-center justify-center m-auto overflow-auto h-screen overscroll-y-none">
      <div className=" w-[100vh] h-[50px] z-10 bg-white">
        <h1 className="text-4xl text-center mt-4 ">Хүлээн авсан зар</h1>
      </div>
      <div className="overscroll-y-none  flex-col flex items-center pb-[100px]">
        {data.map((el, ind) => {
          return (
            <Card key={ind} >
              <PostReceived
                name={el.advertisingHeader}
                owner={el.owner.name}
                description={el.detail}
              />
              <PostButton />
            </Card>
          );
        })}
      </div>
    </div>
  );

};
