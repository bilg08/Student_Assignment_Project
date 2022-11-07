import { PostReceived } from "./ui/postReceived";
import { PostButton } from "./ui/postButton";
import { ProfileCard, Button } from "../components/index";
import data from "../data/advertisings.json";
import { useState } from "react";

export const ReceivedPosts = () => {
	const [chosen, setChosen] = useState(false);
	return (
		<div className='flex-col items-center lg:w-4/6 md:w-full xs:w-full  m-auto ml-14 overflow-auto h-screen  overscroll-y-none'>
			<div className=' h-[50px] z-10  bg-white flex justify-between items-end'>
				<h1 className='text-4xl text-center mt-4'>
					{chosen ? "Миний зар" : "Хүлээн авсан зар"}
				</h1>
				<Button onClick={() => setChosen(!chosen)}>
					{chosen ? "Миний зар" : "Хүлээн авсан зар"}
				</Button>
			</div>
			{chosen ? (
				<>posted ads</>
			) : (
				<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
					{data.map((el, ind) => {
						return (
							<ProfileCard key={ind}>
								<PostReceived
									name={el.advertisingHeader}
									owner={el.owner.name}
									description={el.detail}
								/>
								<PostButton />
							</ProfileCard>
						);
					})}
				</div>
			)}
		</div>
	);
};
