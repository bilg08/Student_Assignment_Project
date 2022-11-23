import axios from "axios";
import {
	ReactElement,
	JSXElementConstructor,
	ReactFragment,
	ReactPortal,
	Key,
	MouseEventHandler,
} from "react";
import { UserProfileBox } from "../chat/userProfile";
import { ProfileCard } from "../profileCard";
import { PostButton } from "./postButton";
import { PostReceived } from "./postReceived";

export interface ChosenListProps {
	chosen?: any;
	personalPosts?: any;
}

const buttonArr = [
	{
		textValue: "Submit",
		style: "#BFFCC6",
		function: () => console.log("submit"),
	},
	{
		textValue: "Cancel",
		style: "#FFABAB",
		function: () => console.log("cancel"),
	},
];
const postedButtonArr = [
	{
		textValue: "Edit",
		style: "#C4FAF8",
		function: () => console.log("edit"),
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
					console.log(response);
				});
		},
	},
];

export const Chosen: React.FC<ChosenListProps> = ({
	chosen,
	personalPosts,
}) => {
	console.log(personalPosts);
	return (
		<div className='overscroll-y-none  flex-col flex items-center pb-[100px]'>
			{personalPosts.map(
				(
					el: {
						subject: any;
						detail: any;
						pendingRequest: any[];
						worker: {
							id: any;
							email:
								| string
								| number
								| boolean
								| ReactElement<any, string | JSXElementConstructor<any>>
								| ReactFragment
								| ReactPortal
								| null
								| undefined;
						};
					},
					ind: Key | null | undefined
				) => {
					return (
						<ProfileCard key={ind}>
							<PostReceived
								name={el.subject}
								owner={"oruuln"}
								description={el.detail}
							/>
							<div className='flex flex-row flex-wrap'>
								{postedButtonArr?.map(
									(
										el: {
											textValue: string | undefined;
											style: string | undefined;
											function:
												| MouseEventHandler<HTMLButtonElement>
												| undefined;
										},
										index: Key | null | undefined
									): any => (
										<PostButton
											key={index}
											data={el.textValue}
											prop={el.style}
											ym={el.function}
										/>
									)
								)}
							</div>
							<div>
								<h1>Хийх хүсэлтүүд:</h1>
								{el.pendingRequest.map((request) => {
									return (
										<div className=' h-fit lg:w-full md:w-5/6 xs:w-[80%] border border-black rounded-lg flex flex-col p-2'>
											<UserProfileBox request={request} />
										</div>
									);
								})}
								{el.worker.id && (
									<div className='bg-yellow-300 flex flex-col'>
										<h1>Хийх хүн</h1>

										<div className='flex items-center justify-around'>
											{el.worker.email}{" "}
											<PostButton
												data={"Харилцах"}
												prop={"rgb(225 29 72)"}
											/>
										</div>
									</div>
								)}
							</div>
						</ProfileCard>
					);
				}
			)}
		</div>
	);
};
