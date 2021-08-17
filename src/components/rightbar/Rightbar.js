import "./rightbar.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [followers, setFollowers] = useState([]);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?.id)
	);

	useEffect(() => {
		const getFollowers = async () => {
			try {
				const followersList = await axios.get("users/followers/" + user._id);
				setFollowers(followersList.data);
			} catch (err) {
				console.log(err);
			}
		};
		getFollowers();
	}, [user]);

	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put(`/users/${user._id}/unfollow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				await axios.put(`/users/${user._id}/follow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "FOLLOW", payload: user._id });
			}
			setFollowed(!followed);
		} catch (err) {}
	};

	const HomeRightbar = () => {
		return (
			<>
				<div className="birthdayContainer">
					<img
						className="birthdayImg"
						src="https://icons-for-free.com/iconfiles/png/512/present+icon-1320184287234188353.png"
						alt=""
					></img>
					<span className="birthdayText">
						<b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
					</span>
				</div>
				<img
					className="rightbarAd"
					src="https://i.pinimg.com/originals/bf/5f/a1/bf5fa1e612d2c8c9b5861aba6d1e1748.jpg"
					alt=""
				></img>
			</>
		);
	};
	const ProfileRightbar = () => {
		return (
			<>
				{user.username !== currentUser.username && (
					<button className="rightbarFollowButton" onClick={handleClick}>
						{followed ? "Unfollow" : "Follow"}
						{followed ? <Remove></Remove> : <Add></Add>}
					</button>
				)}
				<h4 className="rightbarTitle">User information title</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City: </span>
						<span className="rightbarInfoValie">{user.city}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">From: </span>
						<span className="rightbarInfoValie">{user.from}</span>
					</div>
				</div>
				<h4 className="rightbarTitle">Followings</h4>
				<div className="rightbarFollowings">
					{followers.map((follower) => (
						<Link
							key={follower._id}
							style={{ textDecoration: "none" }}
							to={"/profile/" + follower.username}
						>
							<div className="rightbarFollowing">
								<img
									src={follower.profilePicture || PF + "/person/noAvatar.png"}
									className="rightbarFollowingImg"
									alt=""
								></img>
								<span className="rightbarFollwingName">
									{follower.username}
								</span>
							</div>
						</Link>
					))}
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{user ? (
					<ProfileRightbar></ProfileRightbar>
				) : (
					<HomeRightbar></HomeRightbar>
				)}
			</div>
		</div>
	);
}
