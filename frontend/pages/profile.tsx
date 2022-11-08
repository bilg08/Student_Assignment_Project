import React, { useState } from "react";
import {
	PostModal,
	UserSideBar,
	ReceivedPosts,
	SeizedSideBar,
} from "../components/index";
import { useCollectionContext } from "../context/isActive";
import { useWindowWidth } from "../hooks";
const UserProfile = () => {
	const { cActive, setCactive } = useCollectionContext();

	const windowWidth = useWindowWidth();


	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			{windowWidth >= 950 ? <UserSideBar /> : <SeizedSideBar />}
			<ReceivedPosts />
			{cActive ? (
				<PostModal
					cActive={cActive}
					setCactive={setCactive}
				/>
			) : (
				false
			)}
		</div>
	);
};
export default UserProfile;
