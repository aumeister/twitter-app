import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";

export default function Messenger() {
	return (
		<>
			<Topbar></Topbar>
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							placeholder="Search for friends"
							className="chatMenuInput"
						></input>
						<Conversation></Conversation>
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						<div className="chatBoxTop">
							<Message></Message>
							<Message></Message>
							<Message></Message>
							<Message own={true}></Message>
							<Message></Message>
							<Message></Message>
							<Message></Message>
							<Message own={true}></Message>
							<Message></Message>
							<Message></Message>
							<Message></Message>
							<Message own={true}></Message>
							<Message></Message>
							<Message></Message>
							<Message></Message>
							<Message own={true}></Message>
						</div>
						<div className="chatBoxBottom">
							<textarea
								className="chatMessageInput"
								placeholder="Write something"
							></textarea>
							<button className="chatSubmitButton">Send</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
