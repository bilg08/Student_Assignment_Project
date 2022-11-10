import React, { useState } from "react";
import {
	PostModal,
	UserSideBar,
	ReceivedPosts,
	SeizedSideBar,
} from "../components/index";
import { useIsUserLoggedContext } from "../context";
import { useCollectionContext } from "../context/isActive";
import { useWindowWidth } from "../hooks";
import LoginPage from "./loginPage";
const UserProfile = () => {
	const { cActive, setCactive } = useCollectionContext();
	const {isLoggedIn} = useIsUserLoggedContext()
	const windowWidth = useWindowWidth();
	if(!isLoggedIn) return <LoginPage/>

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
