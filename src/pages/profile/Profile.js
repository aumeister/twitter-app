import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Edit } from "@material-ui/icons";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);
	const [user, setUser] = useState(currentUser);
	const username = useParams().username;

	const changeProfileCover = async (e) => {
		try {
			console.log("cover");
			const file = await handleFiles(e);
			await axios.put("http://localhost:8080/api/users/" + user._id, {
				userId: user._id,
				coverPicture: file,
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	const changeProfileImg = async (e) => {
		try {
			console.log("profile");
			const file = await handleFiles(e);
			await axios.put("http://localhost:8080/api/users/" + user._id, {
				userId: user._id,
				profilePicture: file,
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	let postImageBase64;
	async function handleFiles(e) {
		if (
			e.target.files[0].type !== "image/jpeg" &&
			e.target.files[0].type !== "image/jpg" &&
			e.target.files[0].type !== "image/png"
		) {
			alert("Фотография должна быть формата jpg,jpeg или png");
			return (e.target.value = null);
		}
		return (postImageBase64 = await Main(postImageBase64, e.target.files[0]));
	}

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	async function Main(sourceString, file) {
		return (sourceString = await toBase64(file));
	}

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
							<label
								htmlFor="cover"
								className="profileImageEdit"
								title="Change Image"
							>
								<Edit></Edit>
								<input
									style={{ display: "none" }}
									type="file"
									id="cover"
									accept=".png,.jpg,.jpeg"
									onChange={changeProfileCover}
								></input>
							</label>
							<img
								alt=""
								src={user.profilePicture || PF + "/person/noAvatar.png"}
								className="profileUserImg"
							></img>
							<label
								htmlFor="img"
								className="profileImageEdit profileUserImgEdit"
								title="Change Image"
							>
								<Edit></Edit>
								<input
									style={{ display: "none" }}
									type="file"
									id="img"
									accept=".png,.jpg,.jpeg"
									onChange={changeProfileImg}
								></input>
							</label>
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
