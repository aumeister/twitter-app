import "./message.css";

export default function Message({ own }) {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img className="messageImg" src="" alt=""></img>
				<p className="messageText">asdasdasd</p>
			</div>
			<div className="messageBottom"></div>
		</div>
	);
}
