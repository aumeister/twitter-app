import "./group.css";

export default function Group({ group, currentUser }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="conversation">
			<img
				className="conversationImg"
				src={PF + "/person/group.png"}
				alt=""
			></img>
			<span className="conversationName">{group.groupName}</span>
		</div>
	);
}
