import "./conversation.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState(null);
	useEffect(() => {
		const friendId = conversation.members.find(
			(member) => member !== currentUser._id
		);
		const getUser = async () => {
			try {
				const res = await axios.get("/users?userId=" + friendId);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);
	return (
		<div className="conversation">
			<img
				className="conversationImg"
				src={user?.profilePicture || PF + "/person/noAvatar.png"}
				alt=""
			></img>
			<span className="conversationName">{user?.username}</span>
		</div>
	);
}
