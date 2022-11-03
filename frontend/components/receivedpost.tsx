import { Card } from "./Card";
import data from "../data/advertisings.json";
export const ReceivedPosts = () => {
	return (
		<div className='w-2/6 flex flex-row flex-wrap justify-center'>
			<h1 className='text-4xl text-center mt-4'>Хүлээн авсан зар</h1>
			<div className='flex flex-row flex-wrap justify-center w-screen md:w-screen lg:w-11/12 '>
				{data.map((el, ind) => {
					return (
						<Card key={ind}>
							<div>
								{/* <img
				                    className='w-full'
				                    src='/img/card-top.jpg'
				                    alt='Sunset in the mountains'
			                    /> */}
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
};
