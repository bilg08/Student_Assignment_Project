import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import data from "../data/advertisings.json";
import { Card } from "./Card";
export const ReceivedPosts = () => {
<<<<<<< HEAD
	return (
		<div className='w-2/6 flex flex-row flex-wrap justify-center'>
			<h1 className='text-4xl text-center mt-4'>Хүлээн авсан зар</h1>
			<div className='flex flex-row flex-wrap justify-center w-screen md:w-screen lg:w-11/12 '>
				{data.map((el, ind) => {
					return (
						<Card key={ind}>
							<div>
								<div>
									<div className='font-bold text-xl mb-2'>
										{el.advertisingHeader}
									</div>
									<div className='text-m mb-2'>
										<span className='font-bold text-base'>Зар тавьсан:</span>
										{el.owner.name}
									</div>
									<p className='text-gray-700  text-base'>
										<span className='font-bold text-gray-600 text-base'>
											Бие даалт:
										</span>
										{el.detail}
									</p>
								</div>
								<div className='pt-4 '>
									<button className='inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
										Chat
									</button>
									<button className='inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
										Submit
									</button>
									<button className='inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
										Cancel
									</button>
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
=======
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
>>>>>>> parent of fe34519 (Revert ".")
};
