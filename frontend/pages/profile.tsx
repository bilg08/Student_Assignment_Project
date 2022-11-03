import { PostModal, UserSideBar, ReceivedPosts } from "../components/index";
import { useCollectionContext } from "../context/isActive";
const UserProfile = () => {
	const { cActive , setCactive} = useCollectionContext();
	
	return (
		<div style={{ display: "flex", flexDirection: "row" }} >
			<UserSideBar />
			<ReceivedPosts/>
			{cActive? <PostModal cActive={cActive} setCactive={setCactive}/> : false}
		</div>
	);
};
export default UserProfile;
