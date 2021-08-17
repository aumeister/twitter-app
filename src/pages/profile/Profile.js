import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);
	const [user, setUser] = useState(currentUser);
	const username = useParams().username;

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);
	return (
		<>
			<Topbar></Topbar>
			<div className="profile">
				<Sidebar></Sidebar>
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								src={user.coverPicture || PF + "/person/noCover.png"}
								alt=""
								className="profileCoverImg"
							></img>
							<img
								alt=""
								src={user.profilePicture || PF + "/person/noAvatar.png"}
								className="profileUserImg"
							></img>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDecs">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username}></Feed>
						<Rightbar user={user}></Rightbar>
					</div>
				</div>
			</div>
		</>
	);
}
