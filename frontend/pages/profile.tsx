import {
	PostModal, ReceivedPosts,
	SeizedSideBar, UserSideBar
} from "../components/index";
import { useCollectionContext, useIsUserLoggedContext } from "../context/index";
import { useWindowWidth } from "../hooks";
import LoginPage from "./loginPage";
const UserProfile = () => {
	const { cActive, setCactive } = useCollectionContext();
	const { isLoggedIn } = useIsUserLoggedContext();
	const windowWidth = useWindowWidth();
	if (!isLoggedIn) return <LoginPage />;
    
	return (
		<div
			style={{ display: "flex", flexDirection: "row" }}
			className='max-w-screen-xl m-auto min-h-screen flex  justify-center items-baseline relative lg:mt-12 '>
			{windowWidth >= 950 ? <UserSideBar /> : <SeizedSideBar />}
			<ReceivedPosts />
			{ cActive&&(
				<PostModal
					cActive={cActive}
					setCactive={setCactive}
				/>
			) }
		</div>
	);
};
export default UserProfile;
